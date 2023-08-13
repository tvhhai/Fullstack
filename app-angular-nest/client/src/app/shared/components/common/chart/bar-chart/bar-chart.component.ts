import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {BarChartOptions} from "@shared/components/common/chart/bar-chart/model/bar-chart.model";

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

    @Input() chartOptions!: BarChartOptions;


    constructor() {
    }

    ngOnInit() {
    }

}
