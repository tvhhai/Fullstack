import { BarChartOptions } from '@shared/components/common/chart/bar-chart/model/bar-chart.model';

export class BarChartConstant {
  public static readonly DATA_CONFIG_BAR_CHART_DEFAULT: BarChartOptions = {
    chart: {
      type: 'bar',
    },
    dataLabels: {
      enabled: false,
    },
    fill: {},
    labels: ['labels'],
    legend: {
      floating: false,
      position: 'bottom',
      show: true,
    },
    noData: {
      align: 'center',
      offsetX: 0,
      offsetY: -10,
      style: {
        color: undefined,
        fontFamily: undefined,
        fontSize: '22px',
      },
      text: 'No data available',
      verticalAlign: 'middle',
    },
    plotOptions: {},
    responsive: [],
    series: [
      {
        data: [0],
        name: 'series',
      },
    ],
    stroke: {},
    title: {},
    tooltip: {
      y: {},
    },
    xaxis: {
      categories: [],
    },
    yaxis: {},
  };
}
