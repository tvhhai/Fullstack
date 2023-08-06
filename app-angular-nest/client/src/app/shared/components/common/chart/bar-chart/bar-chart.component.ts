import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { BarChartConfig, BarChartType } from "@shared/components/common/chart/bar-chart/model/bar-chart.model";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  protected readonly BarChartType = BarChartType;

  @Input() config!: BarChartConfig;
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

}
