import {
  SimpleChanges,
  EventEmitter,
  Component,
  OnChanges,
  Output,
  OnInit,
  Input,
} from '@angular/core';
import { ButtonGroup } from '@shared/components/common/button-group/button-group.model';
import { differenceWith, includes, filter, remove } from 'lodash';
import { MatSelectionList } from '@angular/material/list';
import { isEmptyArray } from '@shared/helpers';
import { isEqual } from 'lodash';

import { ButtonColor, ButtonTypes } from '../button/button.enum';

@Component({
  selector: 'app-transfer-list',
  styleUrls: ['./transfer-list.component.scss'],
  templateUrl: './transfer-list.component.html',
})
export class TransferListComponent implements OnChanges, OnInit {
  protected ButtonTypes = ButtonTypes;
  protected ButtonColor = ButtonColor;

  @Input() inputList!: any[];
  @Input() selectedList!: any[];
  @Input() config!: any;
  @Input() isDisable = false;

  @Output() getCurrentList = new EventEmitter();

  available!: Array<any>;
  selected!: Array<any>;
  selectedLeftIds!: number[];
  selectedRightIds!: number[];

  btnGroupDataLeftTransfer: ButtonGroup[] = [
    {
      click: () => this.transferRight(),
      color: ButtonColor.Primary,
      disable: () => {
        return isEmptyArray(this.avail) || isEmptyArray(this.selectedLeftIds);
      },
      icon: 'chevron_right',
      type: ButtonTypes.IconSquareContained,
    },
    {
      click: () => this.addAllItem(),
      color: ButtonColor.Primary,
      disable: () => {
        return isEmptyArray(this.avail);
      },
      icon: 'keyboard_double_arrow_right',
      type: ButtonTypes.IconSquareContained,
    },
  ];

  btnGroupData: ButtonGroup[] = [
    {
      click: () => this.removeAllItem(),
      color: ButtonColor.Primary,
      disable: () => {
        return isEmptyArray(this.selected);
      },
      icon: 'keyboard_double_arrow_left',
      type: ButtonTypes.IconSquareContained,
    },
    {
      click: () => this.transferLeft(),
      color: ButtonColor.Primary,
      disable: () => {
        return (
          isEmptyArray(this.selected) || isEmptyArray(this.selectedRightIds)
        );
      },
      icon: 'chevron_left',
      type: ButtonTypes.IconSquareContained,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.available = this.inputList;
    this.selected = this.selectedList;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedList'] &&
      isEmptyArray(changes['selectedList'].currentValue)
    ) {
      this.removeAllItem();
    }
  }

  get avail() {
    return differenceWith(this.available, this.selected, isEqual);
  }

  onLeftSelection(options: MatSelectionList) {
    this.selectedLeftIds = [];
    options._value?.map((o: any) => {
      this.selectedLeftIds.push(o.id);
    });
    // console.log("selectedLeftIds: ", this.selectedLeftIds);
  }

  addItem(item: any) {
    this.selected.push(item);
    this.emitData();
  }

  addAllItem() {
    if (!isEmptyArray(this.avail)) {
      this.selected = [...this.avail, ...this.selected];
    }
    this.emitData();
  }

  onRightSelection(options: MatSelectionList) {
    this.selectedRightIds = [];
    options._value?.map((o: any) => {
      this.selectedRightIds.push(o.id);
    });
    // console.log("selectedRightIds: ", this.selectedRightIds);
  }

  removeItem(item: any) {
    const index = this.selected.indexOf(item);
    if (index !== -1) {
      this.selected.splice(index, 1);
    }
    this.emitData();
  }

  removeAllItem() {
    if (!isEmptyArray(this.selected)) {
      this.selected = [];
    }
    this.emitData();
  }

  transferRight(ids: number[] = this.selectedLeftIds) {
    const selectedElements = filter(this.available, v => includes(ids, v.id));
    this.selected = [...this.selected, ...selectedElements];
    this.selectedLeftIds = [];
    this.emitData();
  }

  transferLeft(ids: number[] = this.selectedRightIds) {
    // console.log('ids: ', ids);
    const selectedElements = filter(this.selected, v => includes(ids, v.id));
    this.selected = remove(this.selected, el => {
      return selectedElements.findIndex(elm => el.id === elm.id) < 0;
    });
    this.selectedRightIds = [];
    this.emitData();
  }

  emitData() {
    const data = {
      available: this.avail,
      selected: this.selected,
    };
    this.getCurrentList.emit(data);
  }
}
