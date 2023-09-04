import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { TaskService } from "./task.service";
import {
    IDataSectionTaskReq,
    ISectionTask,
    ISectionTaskReq,
    ISectionTaskUpdateIndexReq,
    ITask,
    ITaskReq
} from "./model/task.model";
import { isDefined, isEmptyArray } from "@shared/helpers";

@Component({
    selector: "app-task",
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"]
})
export class TaskComponent {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;
    protected readonly isEmptyArray = isEmptyArray;

    @Input() prjTaskId!: number;
    @Input() data!: { tasks: ITask[], sectionTasks: ISectionTask[] };
    @Input() view!: string;
    @Output() saveTask = new EventEmitter();
    @Output() saveSection = new EventEmitter();

    taskName: string = "";
    taskDescription: string = "";

    isViewTaskEditor: boolean = false;
    isViewSectionEditor: boolean = false;

    sectionName: string = "";

    listIconAction: string[] = ["iconoirEditPencil", "iconoirCalendarPlus", "iconoirMessageText", "iconoirMoreHoriz"];
    currentView!: string;

    constructor(private taskService: TaskService,) {
    }

    ngOnInit(): void {
        console.log("this.data", this.view);
        this.currentView = this.view;
        // console.log(this.currentView);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes["view"]) {
            this.currentView = changes["view"].currentValue;
        }
        // console.log(this.currentView);
    }

    // getTask(prjTaskId: number) {
    //     this.taskService.getDataByPrjTask(prjTaskId).subscribe(
    //         (res) => {
    //             // console.log(res);
    //             this.taskList = res.data;
    //         }
    //     );
    // }


    onAddTask(item: any) {
        this.isViewTaskEditor = false;
        if (item) {
            this.data.sectionTasks.forEach(val => {
                val.isViewTaskEditor = item.id === val.id;
            });
        } else {
            this.data.sectionTasks.forEach(val => {
                val.isViewTaskEditor = false;
            });
            this.isViewTaskEditor = true;
        }
    }

    onAddSection(item: any) {
        this.isViewSectionEditor = false;
        if (item) {
            this.data.sectionTasks.forEach(val => {
                val.isViewSectionEditor = item.id === val.id;
            });
        } else {
            this.data.sectionTasks.forEach(val => {
                val.isViewSectionEditor = false;
            });
            this.isViewSectionEditor = true;
        }
    }

    onCancelSaveTask(item: any) {
        item ? item.isViewTaskEditor = false :
            this.isViewTaskEditor = false;
    }

    onCancelSaveSection(item: any) {
        item ? item.isViewSectionEditor = false :
            this.isViewSectionEditor = false;
    }

    onSaveTask(item: any) {
        let taskReq;
        if (item) {
            console.log(item);
            taskReq = {
                sectionTask: item.id,
                title: this.taskName,
                description: this.taskDescription
            };
        } else {
            console.log(item);
            taskReq = {
                projectTask: this.prjTaskId,
                title: this.taskName,
                description: this.taskDescription
            };
        }

        this.taskService.createTask(taskReq).subscribe((res) => {
            console.log(res);
            // this.getTask(this.prjTaskId);
            this.saveTask.emit();
        });
    }

    isValid = (): boolean => {
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
            isViewSectionEditor: false,
            isViewTaskEditor: false,
            tasks: [],
            title: name
        };
    }

    onSaveSection(item: ISectionTask, insertPosition: number) {
        const sectionTasksSize = this.data.sectionTasks.length;

        if (isDefined(insertPosition)) {
            const dataSectionTasksReq = this.prepareDataSectionTasksDefault(this.sectionName, insertPosition);
            this.data.sectionTasks.splice(insertPosition, 0, dataSectionTasksReq);
        } else {
            const dataSectionTasksReq = this.prepareDataSectionTasksDefault(this.sectionName, sectionTasksSize + 1);
            this.data.sectionTasks.push(dataSectionTasksReq);
        }

        this.updateIndexSectionTasks();

        this.prepareDataReqAndSaveSection(item, insertPosition ?? sectionTasksSize);
    }

    updateIndexSectionTasks() {
        this.data.sectionTasks.forEach((val, i) => {
            val.index = i + 1;
        });
    }

    prepareDataReqAndSaveSection(item: ISectionTask, index: number) {
        const sectionTaskReq: ISectionTaskReq = {
            title: this.sectionName,
            projectTask: this.prjTaskId,
            index: index + 1,
        };

        const sectionTaskUpdateIndex: ISectionTaskUpdateIndexReq[] = this.data.sectionTasks.map(val => ({
            id: val.id,
            index: val.index,
        }));

        this.taskService.createAndUpdateSection({ sectionTaskReq, sectionTaskUpdateIndex }).subscribe((res) => {
            this.saveSection.emit();
            item ? item.isViewSectionEditor = false : this.isViewSectionEditor = false;
        });
    }
}
