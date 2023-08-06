import {Color, LegendPosition} from "@swimlane/ngx-charts";

export interface ChartConfig {
  colorScheme: string | Color;
  results: ChartData[];
  gradient: boolean;
  legend: boolean;
  legendPosition: LegendPosition;
  labels: boolean;
  doughnut: boolean;
}

export interface ColorSchemeCustom {
  domain: string[]
}

export interface ChartData {
  name: string,
  value: number | string
}

export interface GroupBarChartData {
  name: string,
  series: Record<string, number | string>[]
}




