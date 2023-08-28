import { Component, Input } from "@angular/core";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { SectionTaskService } from "./section-task.service";
import { ISectionTask, ISectionTaskReq } from "./model/section-task.model";
import { isEmptyArray } from "@shared/helpers";

@Component({
    selector: "app-section-task",
    templateUrl: "./section-task.component.html",
    styleUrls: ["./section-task.component.scss"]
})
export class SectionTaskComponent {

    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;
    @Input() prjTaskId!: number;

    viewAddSection: boolean = false;
    sectionName: string = "";
    sectionTaskList: ISectionTask[] = [];

    constructor(private sectionTaskService: SectionTaskService) {
    }

    ngOnInit() {
        this.getSectionTask(this.prjTaskId);
    }

    getSectionTask(prjTaskId: number) {
        this.sectionTaskService.getDataByPrjTask(prjTaskId).subscribe(
            (res) => {
                console.log(res);
                this.sectionTaskList = res.data;
            }
        );
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
                this.getSectionTask(this.prjTaskId);
            }
        );
    }
    onCancelSaveTask(){}

    onCancelSaveSection() {
        this.viewAddSection = false;
    }

    isValid = (): boolean => {
        return !this.sectionName;
    };
    protected readonly isEmptyArray = isEmptyArray;
}
