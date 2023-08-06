import {PieChartConfig} from "@shared/components/common/chart/pie-chart/model/pie-chart.model";
import {LegendPosition} from "@swimlane/ngx-charts";

export class PieChartConstant {
  public static readonly DATA_CONFIG_DEFAULT: PieChartConfig = {
    colorScheme: 'picnic',
    legendTitle: '',
    data: [],
    gradient: false,
    showLegend: true,
    legendPosition: LegendPosition.Right,
    showLabels: true,
    doughnut: true,
  }
}
