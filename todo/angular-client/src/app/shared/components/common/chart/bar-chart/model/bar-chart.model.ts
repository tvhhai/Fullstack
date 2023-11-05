import {ApexTitleSubtitle, ApexStroke, ApexXAxis, ApexYAxis, ApexFill} from "ng-apexcharts/lib/model/apex-types";
import {ChartOptions} from "@shared/components/common/chart/model/chart.model";

export interface BarChartOptions extends ChartOptions {
    fill: ApexFill;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis[] | ApexYAxis;
}
