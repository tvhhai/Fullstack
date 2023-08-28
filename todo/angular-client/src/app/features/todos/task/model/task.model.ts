export interface ITask {
    id: number;
    title: string;
    description: string;
    projectTask: number;
}

export interface ITaskReq {
    title: string;
    description: string;
    projectTask: number;
}