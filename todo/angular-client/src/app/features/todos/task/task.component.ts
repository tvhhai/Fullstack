import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChange,
    SimpleChanges, ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import {
    ButtonColor,
    ButtonTypes,
} from "@shared/components/common/button/button.enum";
import { TaskService } from "./task.service";
import {
    IDataSectionTaskReq,
    ISectionTask,
    ISectionTaskReq,
    ISectionTaskUpdateIndexReq,
    ITask,
    ITaskReq,
} from "./model/task.model";
import {
    arraysEqualIgnoreOrder,
    deepEqual,
    isDefined,
    isEmptyArray,
    isEmptyObj,
} from "@shared/helpers";
import { ActionMode, ETaskPriority, ViewState } from "../todos.enum";
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { cloneDeep, isEqual } from "lodash";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { noop } from "rxjs";

@Component({
    selector: "app-task",
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class TaskComponent implements OnChanges {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;
    protected readonly ViewState = ViewState;
    protected readonly ActionMode = ActionMode;
    protected readonly isEmptyArray = isEmptyArray;
    protected readonly isEmptyObj = isEmptyObj;

    @ViewChild("taskActionMenu") taskActionMenu!: MatMenuTrigger;
    @Input() prjTaskId!: number;
    @Input() data!: {
        tasks: ITask[];
        sectionTasks: ISectionTask[]
    };
    @Input() view!: string;
    @Output() saveTask = new EventEmitter();
    @Output() saveSection = new EventEmitter();

    dataBk!: {
        tasks: ITask[];
        sectionTasks: ISectionTask[]
    };
    taskName: string = "";
    currentView!: string;
    taskDescription: string = "";
    sectionName: string = "";
    cdkTaskId: string = "0";
    cdkSectionId: string[] = [];
    cdkSectionIdAndTaskId: string[] = [this.cdkTaskId];
    viewTaskEditorInTask: boolean = false;
    viewSectionEditorStandalone: boolean = false;
    listIconAction: {
        icon: string;
        click: (task: ITask) => void;
        openMenu: boolean
    }[] = [
        {
            icon: "fa-light fa-pen fa-lg",
            click: (task) => this.onEditTask(task),
            openMenu: false
        },
        {
            icon: "fa-light fa-calendar-days fa-lg",
            click: (task) => this.b(task),
            openMenu: false
        },
        {
            icon: "fa-light fa-message-captions fa-lg",
            click: (task) => this.c(task),
            openMenu: false
        },
        {
            icon: "fa-light fa-ellipsis-stroke fa-xl",
            click: () => noop(),
            openMenu: true
        },
    ];

    sectionActions: {
        icon: string;
        title: string;
        click: (sectionTask: ISectionTask) => void;
    }[] = [
        {
            icon: "fa-light fa-pen-line",
            title: "todo.section.edit",
            click: (sectionTask) => this.onEditSectionTask(sectionTask),
        },
        {
            icon: "fa-light fa-circle-arrow-right",
            title: "todo.section.move",
            click: (sectionTask) => this.onEditSectionTask(sectionTask),
        },
        {
            icon: "fa-light fa-copy",
            title: "todo.section.duplicate",
            click: (sectionTask) => this.onEditSectionTask(sectionTask),
        },
        {
            icon: "fa-light fa-trash-can",
            title: "todo.section.delete",
            click: (sectionTask) => this.onDeleteSectionTask(sectionTask),
        },
    ];

    taskActionMenus: {
        icon: string;
        title: string;
        click: (task: ITask) => void;
    }[] = [
        {
            icon: "fa-light fa-arrow-up-to-line",
            title: "todo.task.addAbove",
            click: () => noop(),
        },
        {
            icon: "fa-light fa-arrow-down-to-line",
            title: "todo.task.addBelow",
            click: () => noop(),
        },
        {
            icon: "fa-light fa-pen-line",
            title: "todo.task.edit",
            click: (task) => this.onEditTask(task),
        },
        {
            icon: "fa-light fa-copy",
            title: "common.duplicate",
            click: () => noop(),
        },
        {
            icon: "fa-light fa-trash-can",
            title: "todo.task.delete",
            click: () => noop(),
        },
    ];
    priorityBackground: Record<any, string> = {
        [ETaskPriority.Priority1]: "#f9e7eb",
        [ETaskPriority.Priority2]: "#fff8ec",
        [ETaskPriority.Priority3]: "#ecf6ff",
        [ETaskPriority.Priority4]: "",
    };

    priorityColors: Record<any, string> = {
        [ETaskPriority.Priority1]: "#fc4b6c",
        [ETaskPriority.Priority2]: "#ffb22b",
        [ETaskPriority.Priority3]: "#1e88e5",
        [ETaskPriority.Priority4]: "",
    };

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        console.log("ngOnInit");
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["view"]) {
            this.handleViewChange(changes["view"]);
        }
        if (changes["data"]) {
            this.handleDataChange();
        }
    }

    private handleViewChange(viewChange: SimpleChange) {
        this.currentView = viewChange.currentValue;
        if (this.currentView === ViewState.Board) {
            this.setupListIconAction();
        }
    }

    private setupListIconAction() {
        this.listIconAction = this.listIconAction.filter(value => value.openMenu);
    }

    private handleDataChange() {
        this.dataBk = cloneDeep(this.data);
        this.collectCdkSectionIds();
    }

    private collectCdkSectionIds() {
        this.cdkSectionId = this.data.sectionTasks.map((task) =>
            task.id.toString()
        );
        this.cdkSectionIdAndTaskId = this.cdkSectionIdAndTaskId.concat(
            this.cdkSectionId
        );
    }

    onEditTask(task: ITask) {
        // console.log(task);
        task.viewTaskEditor = true;
        this.taskName = task.title;
    }

    handleEditTask(task: ITask) {
        const taskReq: ITaskReq = {
            title: this.taskName,
            description: task.description,
            index: task.index,
        };

        this.taskService.updateTask(task.id, taskReq).subscribe(() => {
            this.saveTask.emit();
        });
    }

    b(task: ITask) {
    }

    c(task: ITask) {
    }

    onOpenTaskActionMenu(task: ITask) {
        this.taskActionMenu.openMenu();
    }

    taskComplete(task: ITask) {
        console.log(task);
        const data = {
            done: task.done,
        };

        this.taskService.updateTask(task.id, data).subscribe(() => {
            this.saveTask.emit();
            this.clearForm();
        });
    }

    onAddTask = (item: ITask) => {
        this.clearForm();
        this.viewTaskEditorInTask = false;
        if (item) {
            item.actionMode = ActionMode.Add;
            this.data.sectionTasks.forEach((val) => {
                val.viewTaskEditor = item.id === val.id;
            });
        } else {
            this.data.sectionTasks.forEach((val) => {
                val.viewTaskEditor = false;
            });
            this.viewTaskEditorInTask = true;
        }
    };

    onAddSection(item: ISectionTask) {
        this.viewSectionEditorStandalone = false;
        if (item) {
            item.actionMode = ActionMode.Add;
            this.data.sectionTasks.forEach((val) => {
                val.viewSectionEditor = item.id === val.id;
            });
        } else {
            this.data.sectionTasks.forEach((val) => {
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
                title: "todo.section.delete",
                labelApply: "common.delete",
                message: item.tasks.length
                    ? this.translate.instant("todo.task.msg.deleteWithTask", {
                        section: item.title,
                        task: item.tasks.length,
                    })
                    : this.translate.instant("todo.task.msg.deleteWithoutTask", {
                        section: item.title,
                    }),
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.handleDeleteSectionTask(item.id);
            }
        });
    }

    handleDeleteSectionTask(sectionId: number) {
        this.taskService.deleteSection(sectionId).subscribe(() => {
            this.saveSection.emit();
        });
    }

    onCancelSaveTask(item: ITask) {
        item ? (item.viewTaskEditor = false) : (this.viewTaskEditorInTask = false);
        this.taskName = "";
    }

    onCancelSaveSection(item: ISectionTask) {
        item
            ? ((item.viewSectionEditor = false), delete item.actionMode)
            : (this.viewSectionEditorStandalone = false);
        this.sectionName = "";
    }

    onSaveTask(item: ITask, lengthTask: number) {
        const taskReq: ITaskReq = {
            title: this.taskName,
            description: this.taskDescription,
            index: lengthTask + 1,
        };

        item
            ? (taskReq.sectionTask = item.id)
            : (taskReq.projectTask = this.prjTaskId);

        this.taskService.createTask(taskReq).subscribe(() => {
            this.saveTask.emit();
            this.clearForm();
        });
    }

    clearForm() {
        this.taskName = "";
        this.taskDescription = "";
        this.sectionName = "";
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
            viewTaskEditor: false,
            viewSectionEditor: false,
            tasks: [],
            title: name,
        };
    }

    onSaveSection(item: ISectionTask, insertPosition: number) {
        const sectionTasksSize = this.data.sectionTasks.length;

        if (isDefined(insertPosition)) {
            this.view === ViewState.List ? (insertPosition += 1) : insertPosition;
            const dataSectionTasksReq = this.prepareDataSectionTasksDefault(
                this.sectionName,
                insertPosition
            );
            this.data.sectionTasks.splice(insertPosition, 0, dataSectionTasksReq);
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
            title: this.sectionName,
            projectTask: this.prjTaskId,
            index: index,
        };

        const sectionTaskUpdateIndex: ISectionTaskUpdateIndexReq[] =
            this.data.sectionTasks.map((val) => ({
                id: val.id,
                index: val.index,
            }));

        this.taskService
            .createAndUpdateSection({ sectionTaskReq, sectionTaskUpdateIndex })
            .subscribe(() => {
                this.saveSection.emit();
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
            this.saveSection.emit();
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
        console.log(this.data.sectionTasks);
    }

    updateIndexTask() {
        const tasks = this.updateIndex(this.data.tasks);
        const data = {
            projectTask: this.prjTaskId,
            tasks: tasks,
        };
        this.taskService.updateIndexTask(data).subscribe(() => {
            this.saveTask.emit();
        });
    }

    updateIndexTaskInSection() {
        const section = this.data.sectionTasks;
        const sectionBk = this.dataBk.sectionTasks;

        section.forEach((val) => {
            const sectionBkItem = sectionBk.find((item) => item.id === val.id);

            if (!sectionBkItem) {
                return;
            }

            if (
                !deepEqual(val.tasks, sectionBkItem.tasks) ||
                !arraysEqualIgnoreOrder(val.tasks, sectionBkItem.tasks, "id")
            ) {
                const data = {
                    sectionTask: val.id,
                    tasks: this.updateIndex(val.tasks),
                };

                this.taskService.updateIndexTask(data).subscribe(() => {
                    this.saveTask.emit();
                });
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
