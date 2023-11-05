import {
  ApexPlotOptions,
  ApexTooltip,
  ApexLegend,
  ApexNoData,
} from 'ng-apexcharts/lib/model/apex-types';
import {
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

// export interface GroupBarChartData {
//     name: string,
//     series: Record<string, number | string>[]
// }

export interface ChartOptions {
  chart: ApexChart;
  dataLabels: any;
  labels: any;
  legend: ApexLegend;
  noData: ApexNoData;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  tooltip: ApexTooltip;
}
