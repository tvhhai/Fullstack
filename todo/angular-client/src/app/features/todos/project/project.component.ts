import {
    ButtonColor,
    ButtonTypes,
} from '@shared/components/common/button/button.enum';
import { ViewEncapsulation, Component, ViewChild, OnInit } from '@angular/core';
import { isEmptyArray, isEmptyObj } from '@shared/helpers';
import { MatMenuTrigger } from '@angular/material/menu';
import { MenuService } from '@core/menu/menu.service';
import { ActivatedRoute } from '@angular/router';

import { ISectionTask, ITask } from '../task/model/task.model';
import { IProjectReq, IProject } from './model/project.model';
import { ProjectService } from './project.service';
import { ViewState } from '../todos.enum';
import { ViewMode } from '../todos.model';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-project',
    styleUrls: ['./project.component.scss'],
    templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly ButtonColor = ButtonColor;
    protected readonly ViewState = ViewState;
    protected readonly isEmptyArray = isEmptyArray;

    @ViewChild('actionViewProject') actionViewProject!: MatMenuTrigger;
    @ViewChild('bbb') bbb!: MatMenuTrigger;
    @ViewChild(MatMenuTrigger) menu2!: MatMenuTrigger;

    title = '';
    prjTaskId!: number;
    prjData!: IProject;
    data: { sectionTasks: ISectionTask[]; tasks: ITask[] } = {
        sectionTasks: [],
        tasks: [],
    };
    view: ViewState = ViewState.List;
    isShowCompleteTask = false;
    viewMode: ViewMode = {
        [ViewState.Board]: {
            name: 'Board',
            value: ViewState.Board,
        },
        [ViewState.List]: {
            name: 'List',
            value: ViewState.List,
        },
    };

    constructor(
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private menuService: MenuService
    ) {
        route.params.subscribe(() => {
            const url = this.route.snapshot.paramMap.get('subPath') || '';
            const parts = url.split('-');

            // const name = parts[0];
            this.prjTaskId = Number(parts[1]);
            this.getProject(this.prjTaskId);
        });
    }

    ngOnInit() {
        this.projectService.get().subscribe(res => {
            // console.log(res);
            if (res.id) {
                this.title = res.title;
                this.view = res.view;
                this.isShowCompleteTask = res.isShowCompleteTask;
                this.prjData = res;
            }
        });
    }

    getProject(id: number) {
        this.projectService.getById(id).subscribe(res => {
            if (!isEmptyObj(res.data)) {
                this.data = this.parseDataResponse(res.data);
                this.updateTaskCountMenu(res.data);

                this.projectService.set(res.data);
            }
        });
    }

    updateTaskCountMenu(prjData: IProject) {
        this.menuService.getAll().subscribe(menu => {
            const projectMenu = menu.find(val => val.id === 'project');

            if (projectMenu) {
                const projectItem = projectMenu.child?.find(
                    child => child.id === prjData.id
                );

                if (projectItem) {
                    projectItem.countTask =
                        this.projectService.countTask(prjData);
                }
            }
        });
    }

    parseDataResponse(dataResponse: IProject) {
        const data: { sectionTasks: ISectionTask[]; tasks: ITask[] } = {
            sectionTasks: dataResponse.sectionTasks,
            tasks: dataResponse.tasks,
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
        if (this.view !== view) {
            const data: IProjectReq = {
                view: view,
            };

            this.projectService.update(this.prjTaskId, data).subscribe(res => {
                this.view = view;
            });
        }
        // else {
        //     this.actionViewProject.closeMenu();
        // }
    }

    handleShowCompleteTask(isShowCompleteTask: boolean) {
        const data: IProjectReq = {
            isShowCompleteTask: !isShowCompleteTask,
        };
        this.projectService.update(this.prjTaskId, data).subscribe(res => {
            this.getProject(res.data.id);
        });
    }
}
