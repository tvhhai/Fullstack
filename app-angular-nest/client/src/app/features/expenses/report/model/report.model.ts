import {ApexAxisChartSeries, ApexNonAxisChartSeries} from "ng-apexcharts";

export interface CartWidgetItem {
    value: string | number;
    title: string;
    color: string;
}

export interface parsePieChartData {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    labels: any;
    total?: any;
}
