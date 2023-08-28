import { ITask } from "../../task/model/task.model";

export interface ISectionTaskReq {
    title: string;
    projectTask: number;
}

export interface ISectionTask {
    id: number;
    title: string;
    tasks: ITask[]
}