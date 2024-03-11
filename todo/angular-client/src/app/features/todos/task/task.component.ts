import {
    ViewEncapsulation,
    SimpleChanges,
    EventEmitter,
    SimpleChange,
    Component,
    OnChanges,
    ViewChild,
    Output,
    OnInit,
    Input,
} from '@angular/core';
import {
    arraysEqualIgnoreOrder,
    isEmptyArray,
    isEmptyObj,
    deepEqual,
    isDefined,
} from '@shared/helpers';
import {
    transferArrayItem,
    moveItemInArray,
    CdkDragDrop,
} from '@angular/cdk/drag-drop';
import {
    ButtonColor,
    ButtonTypes,
} from '@shared/components/common/button/button.enum';
import { SnackBarService } from '@shared/components/common/snack-bar/snack-bar.service';
import { DialogComponent } from '@shared/components/common/dialog/dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep, isEqual } from 'lodash';
import { noop } from 'rxjs';

import {
    ISectionTaskUpdateIndexReq,
    ITaskActionMenuSectionItem,
    IDataSectionTaskReq,
    ITaskActionMenuItem,
    ISectionTaskReq,
    ISectionTask,
    ITaskReq,
    ITask,
} from './model/task.model';
import {
    ETaskSectionItemId,
    ETaskPriority,
    ActionMode,
    EDueDateId,
    ViewState,
} from '../todos.enum';
import { TaskItemDetailComponent } from './dialog/task-item-detail/task-item-detail.component';
import { IProject } from '../project/model/project.model';
import { TaskService } from './task.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-task',
    styleUrls: ['./task.component.scss'],
    templateUrl: './task.component.html',
})
export class TaskComponent implements OnChanges, OnInit {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;
    protected readonly ViewState = ViewState;
    protected readonly ActionMode = ActionMode;
    protected readonly isEmptyArray = isEmptyArray;
    protected readonly isEmptyObj = isEmptyObj;

    @ViewChild('taskActionMenu') taskActionMenu!: MatMenuTrigger;
    @Input() prjTaskId!: number;
    @Input() prjData!: IProject;
    @Input() data!: {
        sectionTasks: ISectionTask[];
        tasks: ITask[];
    };
    @Input() view!: string;
    @Output() syncData = new EventEmitter();

    dataBk!: {
        sectionTasks: ISectionTask[];
        tasks: ITask[];
    };
    taskName = '';
    currentView!: string;
    taskDescription = '';
    sectionName = '';
    cdkTaskId = '0';
    cdkSectionId: string[] = [];
    cdkSectionIdAndTaskId: string[] = [this.cdkTaskId];
    viewTaskEditorInTask = false;
    viewSectionEditorStandalone = false;

    iconActions: {
        click: (task: ITask) => void;
        openMenu: boolean;
        icon: string;
    }[] = [
        {
            click: task => this.onEditTask(task),
            icon: 'fa-light fa-pen fa-lg',
            openMenu: false,
        },
        {
            click: task => this.b(task),
            icon: 'fa-light fa-calendar-days fa-lg',
            openMenu: false,
        },
        {
            click: task => this.c(task),
            icon: 'fa-light fa-message-captions fa-lg',
            openMenu: false,
        },
        {
            click: task => this.handleTaskActionMenu(task),
            icon: 'fa-light fa-ellipsis fa-xl',
            openMenu: true,
        },
    ];
    listIconAction = this.iconActions;
    sectionActions: {
        click: (sectionTask: ISectionTask) => void;
        title: string;
        icon: string;
    }[] = [
        {
            click: sectionTask => this.onEditSectionTask(sectionTask),
            icon: 'fa-light fa-pen-line',
            title: 'todo.section.edit',
        },
        {
            click: sectionTask => this.onEditSectionTask(sectionTask),
            icon: 'fa-light fa-circle-arrow-right',
            title: 'todo.section.move',
        },
        {
            click: sectionTask => this.onEditSectionTask(sectionTask),
            icon: 'fa-light fa-copy',
            title: 'todo.section.duplicate',
        },
        {
            click: sectionTask => this.onDeleteSectionTask(sectionTask),
            icon: 'fa-light fa-trash-can',
            title: 'todo.section.delete',
        },
    ];
    taskMenuItems: ITaskActionMenuItem[] = [
        {
            id: 'up',
            click: () => noop(),
            divider: false,
            icon: 'fa-light fa-arrow-up-to-line',
            title: 'todo.task.addAbove',
        },
        {
            id: 'down',
            click: () => noop(),
            divider: false,
            icon: 'fa-light fa-arrow-down-to-line',
            title: 'todo.task.addBelow',
        },
        {
            id: 'edit',
            click: task => this.onEditTask(task),
            divider: true,
            icon: 'fa-light fa-pen-line',
            title: 'todo.task.edit',
        },
        {
            id: 'duplicate',
            click: () => noop(),
            divider: false,
            icon: 'fa-light fa-copy',
            title: 'common.duplicate',
        },
        {
            id: 'delete',
            click: task => this.onDeleteTask(task),
            divider: false,
            icon: 'fa-light fa-trash-can',
            title: 'todo.task.delete',
        },
    ];
    taskMenuSectionItemDueDate: ITaskActionMenuItem = {
        id: ETaskSectionItemId.DueDate,
        children: [
            {
                id: EDueDateId.Today,
                active: false,
                click: () => noop(),
                color: '#7ECC49',
                hide: false,
                icon: 'fa-light fa-calendar-day fa-xl',
                title: 'common.today',
            },
            {
                id: EDueDateId.Tomorrow,
                active: false,
                click: () => noop(),
                color: '#FAD000',
                hide: false,
                icon: 'fa-light fa-sun-bright fa-xl',
                title: 'common.tomorrow',
            },
            {
                id: EDueDateId.ThisWeek,
                active: false,
                click: () => noop(),
                color: '#14AAF5',
                hide: false,
                icon: 'fa-light fa-calendar-week fa-xl',
                title: 'common.thisWeek',
            },
            {
                id: EDueDateId.NextWeek,
                active: false,
                click: () => noop(),
                color: '#E05194',
                hide: false,
                icon: 'fa-light fa-briefcase-arrow-right fa-xl',
                title: 'common.nextWeek',
            },
            {
                id: EDueDateId.NoDate,
                active: false,
                click: () => noop(),
                color: 'red',
                hide: false,
                icon: 'fa-light fa-circle-xmark fa-xl',
                title: 'common.noDate',
            },
            {
                id: EDueDateId.PickDate,
                active: false,
                click: () => noop(),
                color: '',
                hide: false,
                icon: 'fa-light fa-ellipsis-stroke fa-xl',
                title: 'common.more',
            },
        ],
        click: () => noop(),
        icon: '',
        title: 'Due date',
    };
    taskMenuSectionItemPriority: ITaskActionMenuItem = {
        id: ETaskSectionItemId.Priority,
        children: [
            {
                id: ETaskPriority.Priority1,
                active: false,
                click: () => noop(),
                color: '#fc4b6c',
                hide: false,
                icon: 'fa-sharp fa-solid fa-flag fa-lg',
                title: ETaskPriority.Priority1,
            },
            {
                id: ETaskPriority.Priority2,
                active: false,
                click: () => noop(),
                color: '#ffb22b',
                hide: false,
                icon: 'fa-sharp fa-solid fa-flag fa-lg',
                title: ETaskPriority.Priority2,
            },
            {
                id: ETaskPriority.Priority3,
                active: false,
                click: () => noop(),
                color: '#1e88e5',
                hide: false,
                icon: 'fa-sharp fa-solid fa-flag fa-lg',
                title: ETaskPriority.Priority3,
            },
            {
                id: ETaskPriority.Priority4,
                active: false,
                click: () => noop(),
                color: '',
                hide: false,
                icon: 'fa-sharp fa-light fa-flag fa-lg',
                title: ETaskPriority.Priority4,
            },
        ],
        click: () => noop(),
        divider: true,
        icon: '',
        title: 'Priority',
    };
    taskActionMenus: ITaskActionMenuItem[] = [];
    priorityBackground: Record<any, string> = {
        [ETaskPriority.Priority1]: '#f9e7eb',
        [ETaskPriority.Priority2]: '#fff8ec',
        [ETaskPriority.Priority3]: '#ecf6ff',
        [ETaskPriority.Priority4]: '',
    };

    priorityColors: Record<any, string> = {
        [ETaskPriority.Priority1]: '#fc4b6c',
        [ETaskPriority.Priority2]: '#ffb22b',
        [ETaskPriority.Priority3]: '#1e88e5',
        [ETaskPriority.Priority4]: '',
    };

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        private translate: TranslateService,
        private _snackBar: SnackBarService
    ) {}

    ngOnInit(): void {
        // console.log('ngOnInit');
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes['prjData']);
        if (changes['view']) {
            this.handleViewChange(changes['view']);
        }
        if (changes['data']) {
            this.handleDataChange();
        }
    }

    private handleViewChange(viewChange: SimpleChange) {
        this.currentView = viewChange.currentValue;
        this.setupListIconAction();
    }

    private setupListIconAction() {
        const iconActions = cloneDeep(this.iconActions);
        this.listIconAction =
            this.currentView === ViewState.Board
                ? iconActions.filter(value => {
                      if (value.openMenu) {
                          value.icon = 'fa-light fa-ellipsis-stroke fa-xl';
                      }
                      return value.openMenu;
                  })
                : iconActions;
    }

    private handleDataChange() {
        this.dataBk = cloneDeep(this.data);
        this.collectCdkSectionIds();
    }

    private collectCdkSectionIds() {
        this.cdkSectionId = this.data.sectionTasks.map(task =>
            task.id.toString()
        );
        this.cdkSectionIdAndTaskId = this.cdkSectionIdAndTaskId.concat(
            this.cdkSectionId
        );
    }

    onDeleteTask(task: ITask) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                labelApply: 'common.delete',
                message: this.translate.instant('common.deleteItemMsg1', {
                    name: task.title,
                }),
                title: 'todo.task.delete',
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.handleDeleteTask(task.id);
            }
        });
    }

    handleDeleteTask(taskId: number) {
        this.taskService.deleteTask(taskId).subscribe(() => {
            this.syncData.emit();
        });
    }

    handleTaskActionMenu(task: ITask) {
        this.handleTaskMenuSectionItemDueDate(task);
        this.activeTaskMenuSectionItemPriority(task);

        this.taskActionMenus = [];
        const taskMenuItems = Array.from(this.taskMenuItems);
        taskMenuItems.splice(
            3,
            0,
            this.taskMenuSectionItemDueDate,
            this.taskMenuSectionItemPriority
        );
        this.taskActionMenus = taskMenuItems;
    }

    handleTaskMenuSectionItemDueDate(task: ITask) {
        const menuItems = this.taskMenuSectionItemDueDate.children;
        const duaDateTitle = task.duaDateTitle;

        if (menuItems && !isEmptyArray(menuItems)) {
            this.resetMenuItems(menuItems, 'hide');
            if (duaDateTitle === EDueDateId.PickDate) {
                this.resetMenuItems(menuItems, 'hide');
            } else {
                if (
                    task.duaDateTitle === EDueDateId.NoDate ||
                    !task.duaDateTitle
                ) {
                    const noDateItem = menuItems.find(
                        item => item.id === EDueDateId.NoDate
                    );
                    if (noDateItem) {
                        noDateItem.hide = true;
                    }
                } else {
                    const data = menuItems.find(
                        item => item.id === duaDateTitle
                    );
                    if (data) {
                        data.hide = true;
                    }
                }
            }
        }
    }

    activeTaskMenuSectionItemPriority(task: ITask) {
        const priority = task.priority;

        const menuItems = this.taskMenuSectionItemPriority.children;
        if (menuItems && !isEmptyArray(menuItems)) {
            this.resetMenuItems(menuItems, 'active');

            menuItems.forEach(val => {
                if (priority === val.id) {
                    val.active = true;
                }
            });
        }
    }

    resetMenuItems(
        menuItems: ITaskActionMenuSectionItem[],
        keyReset: 'active' | 'hide'
    ) {
        menuItems.forEach(
            (item: ITaskActionMenuSectionItem) => (item[keyReset] = false)
        );
    }

    onEditTask(task: ITask) {
        task.viewTaskEditor = true;
        this.taskName = task.title;
    }

    handleEditTask(task: ITask) {
        const taskReq: ITaskReq = {
            description: task.description,
            index: task.index,
            title: this.taskName,
        };

        this.taskService.updateTask(task.id, taskReq).subscribe(() => {
            this.syncData.emit();
        });
    }

    b(task: ITask) {
        console.log(task);
    }

    c(task: ITask) {
        console.log(task);
    }

    // onOpenTaskActionMenu(task: ITask) {
    //     this.taskActionMenu.openMenu();
    // }

    taskComplete(task: ITask) {
        console.log(task);
        const data = {
            done: task.done,
        };

        this.taskService.updateTask(task.id, data).subscribe(() => {
            this.syncData.emit();
            this.clearForm();
        });
    }

    onAddTask = (item: ITask) => {
        this.clearForm();
        this.viewTaskEditorInTask = false;
        if (item) {
            item.actionMode = ActionMode.Add;
            this.data.sectionTasks.forEach(val => {
                val.viewTaskEditor = item.id === val.id;
            });
        } else {
            this.data.sectionTasks.forEach(val => {
                val.viewTaskEditor = false;
            });
            this.viewTaskEditorInTask = true;
        }
    };

    onAddSection(item: ISectionTask) {
        this.viewSectionEditorStandalone = false;
        if (item) {
            item.actionMode = ActionMode.Add;
            this.data.sectionTasks.forEach(val => {
                val.viewSectionEditor = item.id === val.id;
            });
        } else {
            this.data.sectionTasks.forEach(val => {
                val.viewSectionEditor = false;
            });
            this.viewSectionEditorStandalone = true;
        }
    }

    onEditSectionTask(item: ISectionTask) {
        this.onAddSection(item);
        item.actionMode = ActionMode.Edit;
        this.sectionName = item.title;
    }

    onDeleteSectionTask(item: ISectionTask) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                labelApply: 'common.delete',
                message: item.tasks.length
                    ? this.translate.instant('todo.task.msg.deleteWithTask', {
                          section: item.title,
                          task: item.tasks.length,
                      })
                    : this.translate.instant(
                          'todo.task.msg.deleteWithoutTask',
                          {
                              section: item.title,
                          }
                      ),
                title: 'todo.section.delete',
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.handleDeleteSectionTask(item.id);
            }
        });
    }

    handleDeleteSectionTask(sectionId: number) {
        this.taskService.deleteSection(sectionId).subscribe(() => {
            this.syncData.emit();
        });
    }

    onCancelSaveTask(item: ITask) {
        item
            ? (item.viewTaskEditor = false)
            : (this.viewTaskEditorInTask = false);
        this.taskName = '';
    }

    onCancelSaveSection(item: ISectionTask) {
        if (item) {
            item.viewSectionEditor = false;
            delete item.actionMode;
        } else {
            this.viewSectionEditorStandalone = false;
        }
        item
            ? ((item.viewSectionEditor = false), delete item.actionMode)
            : (this.viewSectionEditorStandalone = false);
        this.sectionName = '';
    }

    onSaveTask(item: ITask, lengthTask: number) {
        const taskReq: ITaskReq = {
            description: this.taskDescription,
            index: lengthTask + 1,
            title: this.taskName,
        };

        item
            ? (taskReq.sectionTask = item.id)
            : (taskReq.projectTask = this.prjTaskId);

        this.taskService.createTask(taskReq).subscribe(() => {
            this.syncData.emit();
            this.clearForm();
        });
    }

    clearForm() {
        this.taskName = '';
        this.taskDescription = '';
        this.sectionName = '';
    }

    isValidTask = (): boolean => {
        return !this.taskName;
    };

    isValidSection = (): boolean => {
        return !this.sectionName;
    };

    openSection(item: ISectionTask) {
        item.isExpand = !item.isExpand;
    }

    prepareDataSectionTasksDefault(name: string, index: number): ISectionTask {
        return {
            id: 0,
            index: index,
            isExpand: false,
            tasks: [],
            title: name,
            viewSectionEditor: false,
            viewTaskEditor: false,
        };
    }

    onSaveSection(item: ISectionTask, insertPosition: number) {
        const sectionTasksSize = this.data.sectionTasks.length;

        if (isDefined(insertPosition)) {
            this.view === ViewState.List
                ? (insertPosition += 1)
                : insertPosition;
            const dataSectionTasksReq = this.prepareDataSectionTasksDefault(
                this.sectionName,
                insertPosition
            );
            this.data.sectionTasks.splice(
                insertPosition,
                0,
                dataSectionTasksReq
            );
        } else {
            const dataSectionTasksReq = this.prepareDataSectionTasksDefault(
                this.sectionName,
                sectionTasksSize + 1
            );
            if (this.view === ViewState.List) {
                this.data.sectionTasks.unshift(dataSectionTasksReq);
                insertPosition = 0;
            } else {
                this.data.sectionTasks.push(dataSectionTasksReq);
                insertPosition = sectionTasksSize;
            }
        }

        this.updateIndexSectionTasks();
        this.prepareDataReqAndSaveSection(item, insertPosition);
    }

    updateIndexSectionTasks() {
        this.data.sectionTasks.forEach((val, i) => {
            val.index = i;
        });
    }

    prepareDataReqAndSaveSection(item: ISectionTask, index: number) {
        const sectionTaskReq: ISectionTaskReq = {
            index: index,
            projectTask: this.prjTaskId,
            title: this.sectionName,
        };

        const sectionTaskUpdateIndex: ISectionTaskUpdateIndexReq[] =
            this.data.sectionTasks.map(val => ({
                id: val.id,
                index: val.index,
            }));

        this.taskService
            .createAndUpdateSection({ sectionTaskReq, sectionTaskUpdateIndex })
            .subscribe(() => {
                this.syncData.emit();
                this.onCancelSaveSection(item);
            });
    }

    onEditSection(item: ISectionTask) {
        const data: IDataSectionTaskReq = {
            sectionTaskReq: {
                title: this.sectionName,
            },
            sectionTaskUpdateIndex: [],
        };
        this.taskService.updateTitleSection(item.id, data).subscribe(() => {
            this.syncData.emit();
            this.onCancelSaveSection(item);
        });
    }

    drop(event: CdkDragDrop<any[], any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    dropTask(event: CdkDragDrop<ITask[], any>) {
        this.drop(event);
        const tasksChanged = !isEqual(this.data.tasks, this.dataBk.tasks);
        const sectionsChanged = !isEqual(
            this.data.sectionTasks,
            this.dataBk.sectionTasks
        );

        if (tasksChanged && !sectionsChanged) {
            this.updateIndexTask();
        } else if (sectionsChanged && !tasksChanged) {
            this.updateIndexTaskInSection();
        } else {
            this.updateIndexTask();
            this.updateIndexTaskInSection();
        }
    }

    dropSection(event: CdkDragDrop<ISectionTask[], any>) {
        this.drop(event);
        // this.data.sectionTasks.forEach((section, i) => {
        //     section.index = i;
        // });
        this.updateIndex(this.data.sectionTasks);
        // console.log(this.data.sectionTasks);
    }

    updateIndexTask() {
        const tasks = this.updateIndex(this.data.tasks);
        const data = {
            projectTask: this.prjTaskId,
            tasks: tasks,
        };
        this.taskService.updateIndexTask(data).subscribe(() => {
            this.syncData.emit();
            this._snackBar.open({
                message: 'Order changed',
            });
        });
    }

    updateIndexTaskInSection() {
        const section = this.data.sectionTasks;
        const sectionBk = this.dataBk.sectionTasks;

        section.forEach(val => {
            const sectionBkItem = sectionBk.find(item => item.id === val.id);

            if (!sectionBkItem) {
                return;
            }

            if (
                !deepEqual(val.tasks, sectionBkItem.tasks) ||
                !arraysEqualIgnoreOrder(val.tasks, sectionBkItem.tasks, 'id')
            ) {
                const data = {
                    sectionTask: val.id,
                    tasks: this.updateIndex(val.tasks),
                };

                this.taskService.updateIndexTask(data).subscribe(() => {
                    this.syncData.emit();
                });
            }
        });
    }

    abc() {
        console.log('aaaaaaaa');
        this.openDialog();
    }

    openDialog() {
        const dialogRef = this.dialog.open(TaskItemDetailComponent, {
            data: {},
            height: '95%',
            position: {
                top: ``,
            },
            width: '950px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                /* empty */
            }
        });
    }

    updateIndex(arr: any[]) {
        return arr.map((val, i) => {
            val.index = i;
            return val;
        });
    }
}
