import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    @Input() dataPagination!: any[];

    @Input() fromIndex!: number;
    @Input() toIndex!: number;
    @Input() currentPage!: number;
    @Input() totalPage!: number;
    @Input() totalRow!: number;
    @Input() itemsPerPage!: number;

    @Input() showPageInfo: boolean = false;
    @Input() displayedRecordRange: boolean = false;

    @Output() pageChange = new EventEmitter<number>();

    onPageChange(number: number) {
        this.pageChange.emit(number)
    }

}
