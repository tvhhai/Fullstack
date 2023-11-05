import { ViewEncapsulation, Component, Input } from '@angular/core';
import { EViewMode } from '@shared/enum/view-mode.enum';
import { noop } from 'rxjs';

import { IProjectActionMenu } from '../model/project.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'project-action',
  styleUrls: ['./action.component.scss'],
  templateUrl: './action.component.html',
})
export class ActionProjectComponent {
  constructor() {}

  protected readonly EViewMode = EViewMode;

  @Input() countTask = 0;
  @Input() isProject = false;
  @Input() project!: any;
  projectActionMenuItems: IProjectActionMenu[] = [
    {
      click: () => noop(),
      icon: 'fa-light fa-arrow-up-to-line',
      title: 'todo.project.addAbove',
    },
    {
      click: () => noop(),
      icon: 'fa-light fa-arrow-down-to-line',
      title: 'todo.project.addBelow',
    },
    {
      click: () => this.edit(),
      icon: 'fa-light fa-pen-line',
      title: 'common.edit',
    },
    {
      click: () => noop(),
      icon: 'fa-light fa-clone',
      title: 'common.duplicate',
    },
    {
      click: () => noop(),
      icon: 'fa-light fa-trash-can',
      title: 'common.delete',
    },
  ];

  edit() {}
}
