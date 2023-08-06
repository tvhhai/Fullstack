import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PieChartConfig} from "@shared/components/common/chart/pie-chart/model/pie-chart.model";
import { isEmptyArray } from "@shared/helpers";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  @Input() config!: PieChartConfig;
  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSelect(event: any) {
    this.select.emit(event)
  }

  onActivate(event: any) {
    this.activate.emit(event)
  }

  onDeactivate(event: any) {
    this.deactivate.emit(event)
  }

    protected readonly isEmptyArray = isEmptyArray;
}
