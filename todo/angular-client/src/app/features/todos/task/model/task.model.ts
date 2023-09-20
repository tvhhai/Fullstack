import { ActionMode, ETaskPriority } from "../../todos.enum";

export interface ITask {
    id: number;
    title: string;
    description: string;
    projectTask: number;
    index: number;
    done: boolean;
    priority: ETaskPriority;
    viewTaskEditor: boolean;
    actionMode?: ActionMode;
}

export interface ITaskReq {
    title?: string;
    description?: string;
    index?: number;
    done?: boolean;
    projectTask?: number;
    sectionTask?: number;
}

export interface IListTaskIndexReq {
    projectTask?: number;
    sectionTask?: number;
    tasks: ITask[];
}

export function validateTaskReq(task: ITaskReq): task is ITaskReq {
    return (task.projectTask !== undefined || task.sectionTask !== undefined);
}

export interface ISectionTaskReq {
    title: string;
    projectTask?: number;
    index?: number;
}


export interface IDataSectionTaskReq {
    sectionTaskReq: ISectionTaskReq,
    sectionTaskUpdateIndex: ISectionTaskUpdateIndexReq[]
}

export interface ISectionTaskUpdateIndexReq {
    id: number,
    index: number
}

export interface ISectionTask {
    id: number;
    index: number;
    title: string;
    tasks: ITask[];
    isExpand: boolean;
    viewTaskEditor: boolean;
    viewSectionEditor: boolean;
    actionMode?: ActionMode;
}