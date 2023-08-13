import {PieChartOptions} from "@shared/components/common/chart/pie-chart/model/pie-chart.model";

export class PieChartConstant {
    public static readonly DATA_CONFIG_PIE_CHART_DEFAULT: PieChartOptions = {
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: {},
                        value: {}
                    }
                }
            }
        },
        dataLabels: {
            enabled: false,
        },
        series: [0],
        chart: {
            type: "donut"
        },
        labels: [],
        legend: {
            show: true,
            position: 'bottom',
            floating: false,
        },
        tooltip: {
            y: {}
        },
        responsive: [],
        noData: {
            text: 'No data available',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: undefined
            }
        }
    }

}
