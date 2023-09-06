import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ProjectService } from "./project.service";
import { ActivatedRoute } from "@angular/router";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { ISectionTask, ITask } from "../task/model/task.model";
import { IProject } from "./model/project.model";
import { isEmptyArray } from "@shared/helpers";
import { ViewState } from "../todos.enum";
import { ViewMode } from "../todos.model";
import { MatMenuTrigger } from "@angular/material/menu";

@Component({
    selector: "app-project",
    templateUrl: "./project.component.html",
    styleUrls: ["./project.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ProjectComponent {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;
    protected readonly ViewState = ViewState;
    protected readonly isEmptyArray = isEmptyArray;


    @ViewChild("aaa") aaa!: MatMenuTrigger;
    @ViewChild("bbb") bbb!: MatMenuTrigger;
    @ViewChild(MatMenuTrigger) menu2!: MatMenuTrigger;

    title: string = "";
    prjTaskId!: number;
    data: { tasks: ITask[], sectionTasks: ISectionTask[] } = {
        tasks: [],
        sectionTasks: []
    };
    view: ViewState = ViewState.Board;

    viewMode: ViewMode = {
        [ViewState.List]: {
            name: "List",
            value: ViewState.List

        },
        [ViewState.Board]: {
            name: "Board",
            value: ViewState.Board
        }
    };

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
        );
        const data: { tasks: ITask[], sectionTasks: ISectionTask[] } = {
            tasks: dataResponse.tasks,
            sectionTasks: dataResponse.sectionTasks
        };

        console.log(data);
        return data;
    }

    list() {
        this.view = ViewState.List;
    }

    board() {
        this.view = ViewState.Board;
    }

    changeView(view: ViewState) {
        this.view = view;
    }


}
