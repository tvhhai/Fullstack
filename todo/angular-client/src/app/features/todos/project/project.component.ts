import { Component } from "@angular/core";
import { ProjectService } from "./project.service";
import { ActivatedRoute } from "@angular/router";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { TaskService } from "../task/task.service";
import { SectionTaskService } from "../section-task/section-task.service";
import { ITask } from "../task/model/task.model";
import { ISectionTask } from "../section-task/model/section-task.model";

@Component({
    selector: "app-project",
    templateUrl: "./project.component.html",
    styleUrls: ["./project.component.scss"]
})
export class ProjectComponent {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;

    title: string = "";
    prjTaskId!: number;

    taskList: ITask[] = [];
    sectionTaskList: ISectionTask[] = [];

    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private taskService: TaskService,
        private sectionTaskService: SectionTaskService
    ) {
        route.params.subscribe(() => {
            const url = this.route.snapshot.paramMap.get("subPath") || "";
            const parts = url.split("-");

            const name = parts[0];
            this.prjTaskId = Number(parts[1]);
            this.getProject(this.prjTaskId);
        });
    }

    ngOnInit() {
        // this.getData();
    }

    getProject(id: number) {
        this.projectService.getById(id).subscribe(res => {
            this.title = res.data.title;
        });
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
}
