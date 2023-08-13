import {ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexResponsive} from "ng-apexcharts";
import {
    ApexFill,
    ApexLegend, ApexNoData,
    ApexPlotOptions,
    ApexStroke, ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis
} from "ng-apexcharts/lib/model/apex-types";



export interface GroupBarChartData {
    name: string,
    series: Record<string, number | string>[]
}


export interface ChartOptions {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    dataLabels: any;
    plotOptions: ApexPlotOptions
    legend: ApexLegend
    tooltip: ApexTooltip
    noData: ApexNoData;
}











