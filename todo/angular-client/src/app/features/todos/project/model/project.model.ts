import { ISectionTask, ITask } from "../../task/model/task.model";

export interface IProject {
    id: number;
    title: string;
    tasks: ITask[];
    sectionTasks: ISectionTask[]
}



export interface IProjectReq {
    title: string;
}