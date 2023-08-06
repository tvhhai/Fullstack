import {LegendPosition} from "@swimlane/ngx-charts";
import {BarChartConfig, BarChartType} from "@shared/components/common/chart/bar-chart/model/bar-chart.model";

export class BarChartConstant {
  public static readonly DATA_CONFIG_DEFAULT: BarChartConfig = {
    chartType: BarChartType.Vertical,
    data: [],
    view: [0, 0],
    colorScheme: 'picnic',
    gradient: false,

    showLegend: true,
    legendTitle: '',
    legendPosition: LegendPosition.Right,

    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    xAxisLabel: 'xAxisLabel',
    yAxisLabel: 'yAxisLabel',
    showDataLabel: false,

  }
}
