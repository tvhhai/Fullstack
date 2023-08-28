import { Component, Input } from "@angular/core";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { TaskService } from "./task.service";
import { ITask, ITaskReq } from "./model/task.model";
import { isEmptyArray } from "@shared/helpers";
import { SectionTaskService } from "../section-task/section-task.service";
import { ISectionTask, ISectionTaskReq } from "../section-task/model/section-task.model";

@Component({
    selector: "app-task",
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"]
})
export class TaskComponent {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;
    @Input() prjTaskId!: number;

    taskName: string = "";
    taskList: ITask[] = [];
    sectionTaskList: ISectionTask[] = [];
    viewTaskEditor: boolean = false;
    taskDescription: string = "";

    viewAddSection: boolean = false;
    sectionName: string = "";

    constructor(private taskService: TaskService,
                private sectionTaskService: SectionTaskService) {
        console.log(this.prjTaskId);
    }

    ngOnInit(): void {
        console.log(this.prjTaskId);
        this.getTask(this.prjTaskId);
        this.getSectionTask(this.prjTaskId);

    }

    getTask(prjTaskId: number) {
        this.taskService.getDataByPrjTask(prjTaskId).subscribe(
            (res) => {
                console.log(res);
                this.taskList = res.data;
            }
        );
    }


    getSectionTask(prjTaskId: number) {
        this.sectionTaskService.getDataByPrjTask(prjTaskId).subscribe(
            (res) => {
                console.log(res);
                this.sectionTaskList = res.data;
            }
        );
    }

    onAddTask() {
        this.viewTaskEditor = true;
    }

    onCancelSaveTask() {
        this.viewTaskEditor = false;
    }

    onSaveTask() {
        console.log(this.taskName, this.taskDescription);
        this.viewTaskEditor = false;
        const taskReq: ITaskReq = {
            title: this.taskName,
            description: this.taskDescription,
            projectTask: this.prjTaskId
        };
        this.taskService.create(taskReq).subscribe((res) => {
            console.log(res);
            this.getTask(this.prjTaskId);
        });
    }

    isValid = (): boolean => {
        return !this.taskName;
    };
    protected readonly isEmptyArray = isEmptyArray;

    open: boolean = false;

    openSection() {
        this.open = !this.open;
    }

    onAddSection() {
        this.viewAddSection = true;
    }

    onSaveSection() {
        console.log(this.sectionName);
        this.viewAddSection = false;

        const sectionTaskReq: ISectionTaskReq = {
            title: this.sectionName,
            projectTask: this.prjTaskId
        };

        this.sectionTaskService.create(sectionTaskReq).subscribe(
            () => {
                // this.getSectionTask(this.prjTaskId);
            }
        );
    }

    onCancelSaveSection() {
        this.viewAddSection = false;
    }
}
