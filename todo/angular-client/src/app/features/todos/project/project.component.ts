import { Component } from "@angular/core";
import { ProjectService } from "./project.service";
import { ActivatedRoute } from "@angular/router";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { ISectionTask, ITask } from "../task/model/task.model";
import { IProject } from "./model/project.model";
import { isEmptyArray } from "@shared/helpers";

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
    data: { tasks: ITask[], sectionTasks: ISectionTask[] } = {
        tasks: [],
        sectionTasks: []
    };
    view: string = "list";

    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute,
        // private taskService: TaskService,
    ) {
        route.params.subscribe(() => {
            const url = this.route.snapshot.paramMap.get("subPath") || "";
            const parts = url.split("-");

            // const name = parts[0];
            this.prjTaskId = Number(parts[1]);
            this.getProject(this.prjTaskId);
        });
    }

    ngOnInit() {
    }

    getProject(id: number) {
        this.projectService.getById(id).subscribe(res => {
            this.title = res.data.title;
            this.data = this.parseDataResponse(res.data);
        });
    }

    parseDataResponse(dataResponse: IProject) {
        dataResponse.sectionTasks.forEach(
            val => {
                val.isViewTaskEditor = false;
                val.isViewSectionEditor = false;
            }
        )
        const data: { tasks: ITask[], sectionTasks: ISectionTask[] } = {
            tasks: dataResponse.tasks,
            sectionTasks: dataResponse.sectionTasks
        };

        console.log(data);
        return data;
    }

    saveSection() {
        console.log('saveSection');
    }

    list() {
        this.view = "list";
    }

    board() {
        this.view = "board";
    }

    protected readonly isEmptyArray = isEmptyArray;
}
