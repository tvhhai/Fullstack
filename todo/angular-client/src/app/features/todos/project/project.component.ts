import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ProjectService } from "./project.service";
import { ActivatedRoute } from "@angular/router";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { ISectionTask, ITask } from "../task/model/task.model";
import { IProject, IProjectReq } from "./model/project.model";
import { isEmptyArray, isEmptyObj } from "@shared/helpers";
import { ViewState } from "../todos.enum";
import { ViewMode } from "../todos.model";
import { MatMenuTrigger } from "@angular/material/menu";
import { AppConstant } from "@shared/constants";

@Component({
    selector: "app-project",
    templateUrl: "./project.component.html",
    styleUrls: ["./project.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
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
    view: ViewState = ViewState.List;
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
            if (!isEmptyObj(res.data)) {
                this.title = res.data.title;
                this.view = res.data.view;
                this.data = this.parseDataResponse(res.data);
            } else {
                window.location.href = AppConstant.PAGE.TODAY_PAGE;
            }
        });
    }

    parseDataResponse(dataResponse: IProject) {
        const data: { tasks: ITask[], sectionTasks: ISectionTask[] } = {
            tasks: dataResponse.tasks,
            sectionTasks: dataResponse.sectionTasks
        };
        return data;
    }

    list() {
        this.view = ViewState.List;
    }

    board() {
        this.view = ViewState.Board;
    }

    changeView(view: ViewState) {
        const data: IProjectReq = {
            view: view,
        };

        this.projectService.update(this.prjTaskId, data).subscribe(() => {
            this.view = view;
        });
    }

}
