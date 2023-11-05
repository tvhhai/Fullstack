import { ISectionTask, ITask } from '../../task/model/task.model';
import { ViewState } from '../../todos.enum';

export interface IProject {
    id: number;
    color: string;
    isShowCompleteTask: boolean;
    sectionTasks: ISectionTask[];
    tasks: ITask[];
    title: string;
    titleSlug: string;
    view: ViewState;
}

export interface IProjectReq {
    color?: string;
    isShowCompleteTask?: boolean;
    title?: string;
    view?: ViewState;
}

export interface IProjectActionMenu {
    click: () => void;
    icon: string;
    title: string;
}
