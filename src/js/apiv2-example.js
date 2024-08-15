import React, {useState, useCallback, useRef} from 'react'
import { Editor } from '@monaco-editor/react'

import Examples from './examples'

const SCHEMA = {
  validate: true,
  schemas: [
    {
      uri: "http://plausible.io/query-schema.json",
      fileMatch: ["*"],
      schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
          site_id: {
            type: "string",
            description: "Domain of site to query"
          },
          metrics: {
            type: "array",
            items: {
              $ref: "#/definitions/metric"
            },
            description: "List of metrics to query"
          },
          date_range: {
            $ref: "#/definitions/date_range",
            description: "Date range to query"
          },
          dimensions: {
            type: "array",
            items: {
              $ref: "#/definitions/dimensions"
            },
            description: "What to group the results by. Same as `property` in Plausible API v1"
          },
          filters: {
            type: "array",
            items: {
              $ref: "#/definitions/filter_entry"
            },
            description: "How to drill into your data"
          },
          order_by: {
            type: "array",
            items: {
              $ref: "#/definitions/order_by_entry"
            },
            description: "How to order query results"
          },
          include: {
            type: "object",
            properties: {
              time_labels: {
                type: "boolean",
                markdownDescription: "Requires a `time` dimension. If enabled, returns each time bucket under `meta.time_labels`"
              },
              imports: { type: "boolean" },
            }
          }
        },
        required: ["site_id", "metrics", "date_range"],
        additionalProperties: false,
        definitions: {
          date_range: {
            oneOf: [
              {
                const: "all",
                description: "Since the start of stats in Plausible"
              },
              {
                const: "day",
                description: "Last day"
              },
              {
                const: "7d",
                description: "Last 7 days relative to today"
              },
              {
                const: "30d",
                description: "Last 30 days relative to today"
              },
              {
                const: "month",
                description: "Current calendar month"
              },
              {
                const: "6mo",
                description: "Last 6 calendar months relative to this month"
              },
              {
                const: "12mo",
                description: "Last 12 calendar months relative to this month"
              },
              {
                const: "year",
                description: "Since the start of this year"
              },
              {
                type: "array",
                items: {
                  type: "string",
                  pattern: "^\\d{4}-\\d{2}-\\d{2}$"
                },
                markdownDescription: "Start and end dates of custom date range. Both dates are in format `YYYY-MM-DD`",
                examples: [["2024-01-01", "2024-01-31"]],
                minItems: 2,
                maxItems: 2
              }
            ]
          },
          metric: {
            oneOf: [
              {
                const: "visitors",
                description: "Metric counting the number of unique visitors"
              },
              {
                const: "visits",
                description: "Metric counting the number of visits/sessions"
              },
              {
                const: "pageviews",
                markdownDescription: "Metric counting the number of `pageview` events"
              },
              {
                const: "views_per_visit",
                description: "Metric for the number of pageviews divided by the number of visits. Returns a floating point number."
              },
              {
                const: "bounce_rate",
                description: "Bounce rate percentage"
              },
              {
                const: "visit_duration",
                description: "Visit duration in seconds"
              },
              {
                const: "events",
                markdownDescription: "The number of events (pageviews + custom events). When filtering by a goal, this metric corresponds to `Total Conversions` in the dashboard."
              },
              {
                const: "percentage",
                markdownDescription: "The percentage of visitors of total who fall into this category. Requires `dimensions` not to be empty"
              },
              {
                const: "conversion_rate",
                markdownDescription: "The percentage of visitors who completed the goal. Requires: `dimension` list passed, an `event:goal` filter or `event:goal` dimension"
              },
              {
                const: "group_conversion_rate",
                markdownDescription: "The percentage of visitors who completed the goal with the same dimension. Requires: dimension list passed, an `event:goal` filter or `event:goal` dimension"
              }
            ]
          },
          simple_filter_dimensions: {
            type: "string",
            enum: [
              "event:name",
              "event:page",
              "event:hostname",
              "visit:source",
              "visit:referrer",
              "visit:utm_medium",
              "visit:utm_source",
              "visit:utm_campaign",
              "visit:utm_content",
              "visit:utm_term",
              "visit:screen",
              "visit:device",
              "visit:browser",
              "visit:browser_version",
              "visit:os",
              "visit:os_version",
              "visit:country",
              "visit:region",
              "visit:city",
              "visit:entry_page",
              "visit:exit_page",
              "visit:entry_page_hostname",
              "visit:exit_page_hostname"
            ]
          },
          custom_property_filter_dimensions: {
            type: "string",
            pattern: "^event:props:",
            markdownDescription: "Custom property. See [documentation](https://plausible.io/docs/custom-props/introduction) for more information",
            examples: ["event:props:url", "event:props:path"]
          },
          goal_dimension: {
            const: "event:goal",
            markdownDescription: "Goal dimension"
          },
          time_dimensions: {
            type: "string",
            enum: [
              "time",
              "time:month",
              "time:week",
              "time:day",
              "time:hour"
            ]
          },
          dimensions: {
            oneOf: [
              { $ref: "#/definitions/simple_filter_dimensions" },
              { $ref: "#/definitions/custom_property_filter_dimensions" },
              { $ref: "#/definitions/goal_dimension" },
            ]
          },
          clauses: {
            type: "array",
            items: { type: "string" }
          },
          filter_entry: {
            oneOf: [
              {
                type: "array",
                items: [
                  {
                    type: "string",
                    enum: ["is_not", "contains", "does_not_contain"],
                    description: "filter operation",
                  },
                  {
                    oneOf: [
                      { $ref: "#/definitions/simple_filter_dimensions" },
                      { $ref: "#/definitions/custom_property_filter_dimensions" },
                    ]
                  },
                  { $ref: "#/definitions/clauses" },
                ],
                minItems: 3,
                maxItems: 3
              },
              {
                type: "array",
                items: [
                  {
                    type: "string",
                    enum: ["is"],
                    description: "filter operation",
                  },
                  {
                    oneOf: [
                      { $ref: "#/definitions/goal_dimension" },
                      // Note: Keeping these here for autocompletion to work
                      { $ref: "#/definitions/simple_filter_dimensions" },
                      { $ref: "#/definitions/custom_property_filter_dimensions" },
                    ]
                  },
                  { $ref: "#/definitions/clauses" },
                ],
                minItems: 3,
                maxItems: 3
              },
            ]
          },
          order_by_entry: {
            type: "array",
            items: [
              {
                oneOf: [
                  { $ref: "#/definitions/metric" },
                  { $ref: "#/definitions/simple_filter_dimensions" },
                  { $ref: "#/definitions/custom_property_filter_dimensions" },
                ],
                markdownDescription: "Metric or dimension to order by. Must be listed under `metrics` or `dimensions`"
              },
              {
                type: "string",
                enum: ["asc", "desc"],
                description: "Sorting order"
              }
            ]
          }
        }
      },
    }
  ]
}

export default function ApiV2Example({ request }) {
  const [height, setHeight] = useState(170);
  const editorRef = useRef();

  const onMount = useCallback((editor, monaco) => {
    editorRef.current = editor

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(SCHEMA)
    editor.onDidChangeModelContent(handleEditorChange)
  })

  const handleEditorChange = useCallback(() => {
    const editAreaHeight = editorRef.current.getContentHeight()
    if (editAreaHeight > height) {
      setHeight(editAreaHeight)
    }
  }, []);

  return (
    <Editor
      theme="vs-dark"
      language="json"
      defaultValue={JSON.stringify(Examples[request], null, 2)}
      height={height}
      options={{
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
        fixedOverflowWidgets: true,
        glyphMargin: false,
        wordWrap: 'off',
        lineNumbers: 'on',
        tabFocusMode: false,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: false,
        scrollBeyondLastLine: false,
      }}
      onMount={onMount}
    />
  )
}
