---
title: Compare your stats over time
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can gain valuable insights and a fresh perspective on your website traffic by comparing stats over time. Our comparison feature allows you to analyze the stats of a specified date range and compare them to another period. 

"**Previous period**", "**Year over year**" and "**Custom period**" comparisons are all available. The comparison is matched by day of the week by default to avoid any discrepancies caused by the weekend. You can also optionally match by date.

You can choose between different chart intervals to display the comparison the way you want and segment your audience any way you wish to analyze that segment over time. And if you've [imported your historical Google Analytics stats](google-analytics-import.md), you can compare against those too.

## How to compare two different date ranges

Here's how to track your progress and identify trends by comparing your stats:

* Select your primary date range using the date picker in the top right of your dashboard or by using one of our [keyboard shortcuts](keyboard-shortcuts.md)

* Then select "**Compare**" in the date picker or press the "**X**" key [on your keyboard](keyboard-shortcuts.md) to enable the comparison feature

<img alt="Date picker for the compare feature" src={useBaseUrl('img/date-picker-compare-feature.png')} />

* This will enable a new comparison drop-down. "**Previous period**" is our default option but you can also compare trends "**Year over year**" or a completely "**Custom period**" too

<img alt="Compare your stats over time" src={useBaseUrl('img/compare-your-stats-over-time.png')} />

* The comparison uses "**Match day of the week**" by default to align the comparison by day of the week. You can select "**Match exact date**" in the comparison drop-down to match by date instead

* The comparison will be shown on the top chart of your Plausible dashboard. You can see the stats for both the primary and the secondary date ranges in the chart. You can hover over to see the percent changes in the tooltip. As with everything else on the dashboard, we'll save your comparison preference for your next visit to save you a click or two

<img alt="Comparison chart" src={useBaseUrl('img/comparison-chart.png')} />

* Want to disable the comparison and get back to the regular view? Press the "**X**" key on your keyboard or choose "**Disable comparison**" in the comparison drop-down

<img alt="Disable comparison" src={useBaseUrl('img/disable-comparison.png')} />

### Segment your audience

First, filter the dashboard in any way you want to [segment your audience](filters-segments.md). Filter by a group of pages, traffic from organic search sources or visitors from a specific geographical region. Then enable the comparison feature to analyze that particular audience segment over time and compare it to a different date range.

### Choose a chart interval 

In the top right of the chart itself, you can choose the unit of time the stats on the chart are grouped by. This gives you a more granular comparison view. The available interval options depend on the date range you've selected. For example, if you select "Last 30 days" as your primary date range, you can display the stats by day or by week.

## Match day of the week or match exact date

Our comparison matches by day of the week by default. This means that your primary date range will be compared to the secondary date range starting with the same day of the week. This helps you eliminate discrepancies due to the weekend or weekday differences.

The alternative option in the comparison drop-down is to "**Match exact date**". When choosing Sunday January 1st to January 7th 2023 as the primary date range and matching by exact date, the year over year comparison will be against Saturday January 1st to January 7th 2022.

 <img alt="Match exact date" src={useBaseUrl('img/comparison-match-exact-date.png')} />

But when "**Match day of the week**" is selected, the comparison will be against Sunday January 2nd to January 8th 2022 instead. It's still compared to the same amount of time but the secondary date range is aligned by day of the week to get more accurate data.

<img alt="Match day of the week" src={useBaseUrl('img/comparison-match-day-week.png')} />

## Available comparison options

Here are the details on the available comparison options:

### Previous period

This is the default comparison mode. Your primary date range will be compared to the same amount of time in the period before it. If you select "**Last 7 days**" as your primary date range, the stats are compared to the previous seven days before it.

### Year over year

Your primary date range will be compared to the same period of the previous calendar year. If you select January 1st to January 7th 2023 as your primary date range and choose "**Match exact date**", a comparison to January 1st to January 7th 2022 will be shown.

### Custom period

Your primary date range will be compared to whatever custom period you select. The custom period can be the same amount of time as the primary date range but it can be longer or shorter too. 

You can compare whatever primary date range you want with whatever custom period you want. This is useful for seasonal holidays, marketing campaigns or any other unique goals and objectives that you have.
