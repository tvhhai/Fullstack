import {BarChartOptions} from "@shared/components/common/chart/bar-chart/model/bar-chart.model";

export class BarChartConstant {
    public static readonly DATA_CONFIG_BAR_CHART_DEFAULT: BarChartOptions = {
        plotOptions: {},
        dataLabels: {
            enabled: false,
        },
        series: [{
            name: "series",
            data: [0]
        }],
        chart: {
            type: "bar"
        },
        labels: ['labels'],
        legend: {
            show: true,
            position: 'bottom',
            floating: false,
        },
        tooltip: {
            y: {}
        },
        responsive: [],
        xaxis: {
            categories: [],
        },
        yaxis: {},
        stroke: {},
        fill: {},
        title: {},
        noData: {
            text: 'No data available',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: -10,
            style: {
                color: undefined,
                fontSize: '22px',
                fontFamily: undefined
            }
        }
    }

}
