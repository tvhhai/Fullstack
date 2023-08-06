import { Color, LegendPosition } from "@swimlane/ngx-charts";
import { GroupBarChartData } from "@shared/components/common/chart/model/chart.model";

export interface BarChartConfig {
    chartType: BarChartType;
    data: GroupBarChartData[];
    view: [number, number];
    colorScheme: string | Color;
    gradient: boolean;

    legendTitle: string;
    legendPosition: LegendPosition;
    showLegend: boolean;

    showXAxis: boolean;
    showYAxis: boolean;
    showXAxisLabel: boolean;
    showYAxisLabel: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
    showDataLabel: boolean;
}

export enum BarChartType {
    Vertical = "vertical",
    Horizontal = "horizontal",
    GroupVertical = "groupVertical",
    GroupHorizontal = "groupHorizontal",
    StackedVertical = "stackedVertical",
    StackedHorizontal = "stackedHorizontal"
}
