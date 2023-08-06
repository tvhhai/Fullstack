import {Color, LegendPosition} from "@swimlane/ngx-charts";
import {ChartData} from "@shared/components/common/chart/model/chart.model";

export interface PieChartConfig {
  data: ChartData[];

  colorScheme: string | Color;
  legendTitle: string;
  gradient: boolean;
  showLegend: boolean;
  legendPosition: LegendPosition;
  showLabels: boolean;
  doughnut: boolean;
}
