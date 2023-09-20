import { ISectionTask, ITask } from "../../task/model/task.model";
import { ViewState } from "../../todos.enum";

export interface IProject {
    id: number;
    title: string;
    color: string;
    view: ViewState;
    tasks: ITask[];
    sectionTasks: ISectionTask[]
}

export interface IProjectReq {
    title?: string;
    view?: ViewState;
    color?: string;
}