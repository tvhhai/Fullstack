import {ApexFill, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis} from "ng-apexcharts/lib/model/apex-types";
import {ChartOptions} from "@shared/components/common/chart/model/chart.model";

export interface BarChartOptions extends ChartOptions {
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    stroke: ApexStroke;
    fill: ApexFill;
    title: ApexTitleSubtitle;
}
