import {PieChartOptions} from "@shared/components/common/chart/pie-chart/model/pie-chart.model";

export class PieChartConstant {
    public static readonly DATA_CONFIG_PIE_CHART_DEFAULT: PieChartOptions = {
        chart: {
            type: "donut"
        },
        dataLabels: {
            enabled: false,
        },
        labels: [],
        legend: {
            floating: false,
            position: 'bottom',
            show: true,
        },
        noData: {
            align: 'center',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontFamily: undefined,
                fontSize: '14px'
            },
            text: 'No data available',
            verticalAlign: 'middle'
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        name: {},
                        show: true,
                        value: {}
                    },
                    size: '75%'
                }
            }
        },
        responsive: [],
        series: [0],
        tooltip: {
            y: {}
        }
    }

}
