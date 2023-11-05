import { EventEmitter, Component, Output, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() dataPagination!: any[];

  @Input() fromIndex!: number;
  @Input() toIndex!: number;
  @Input() currentPage!: number;
  @Input() totalPage!: number;
  @Input() totalRow!: number;
  @Input() itemsPerPage!: number;

  @Input() showPageInfo = false;
  @Input() displayedRecordRange = false;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(number: number) {
    this.pageChange.emit(number);
  }
}
