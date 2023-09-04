export interface ITask {
    id: number;
    title: string;
    description: string;
    projectTask: number;
}

export interface ITaskReq {
    title: string;
    description: string;
    projectTask?: number;
    sectionTask?: number;
}

export function validateTaskReq(task: ITaskReq): task is ITaskReq {
    return (task.projectTask !== undefined || task.sectionTask !== undefined);
}


export interface ISectionTaskReq {
    title: string;
    projectTask: number;
    index: number;
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
    isViewTaskEditor: boolean;
    isViewSectionEditor: boolean;
}