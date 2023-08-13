import {Component, Input} from '@angular/core';
import {isEmptyArray} from "@shared/helpers";
import {PieChartOptions} from "@shared/components/common/chart/pie-chart/model/pie-chart.model";


@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
    protected readonly isEmptyArray = isEmptyArray;

    @Input() chartOptions!: PieChartOptions;

    constructor() {
    }

    ngOnInit() {
    }
}
