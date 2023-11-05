import { PieChartOptions } from '@shared/components/common/chart/pie-chart/model/pie-chart.model';
import { Component, OnInit, Input } from '@angular/core';
import { isEmptyArray } from '@shared/helpers';

@Component({
  selector: 'app-pie-chart',
  styleUrls: ['./pie-chart.component.scss'],
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnInit {
  protected readonly isEmptyArray = isEmptyArray;

  @Input() chartOptions!: PieChartOptions;

  constructor() {}

  ngOnInit() {
    console.log();
  }
}
