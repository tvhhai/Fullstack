import { BarChartOptions } from '@shared/components/common/chart/bar-chart/model/bar-chart.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  styleUrls: ['./bar-chart.component.scss'],
  templateUrl: './bar-chart.component.html',
})
export class BarChartComponent implements OnInit {
  @Input() chartOptions!: BarChartOptions;

  constructor() {}

  ngOnInit() {
    console.log();
  }
}
