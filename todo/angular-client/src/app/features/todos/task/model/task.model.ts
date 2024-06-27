import { ETaskPriority, ActionMode } from '../../todos.enum';

export interface ITask {
    id: number;
    actionMode?: ActionMode;
    description: string;
    done: boolean;
    duaDate: string;
    duaDateTitle: string;
    index: number;
    priority: ETaskPriority;
    projectTask: number;
    title: string;
    viewTaskEditor: boolean;
}

export interface ITaskReq {
    description?: string;
    done?: boolean;
    index?: number;
    projectTask?: number;
    sectionTask?: number;
    title?: string;
}

export interface IListTaskIndexReq {
    projectTask?: number;
    sectionTask?: number;
    tasks: ITask[];
}

export function validateTaskReq(task: ITaskReq): task is ITaskReq {
    return task.projectTask !== undefined || task.sectionTask !== undefined;
}

export interface ISectionTaskReq {
    index?: number;
    projectTask?: number;
    title: string;
}

export interface IDataSectionTaskReq {
    sectionTaskReq: ISectionTaskReq;
    sectionTaskUpdateIndex: ISectionTaskUpdateIndexReq[];
}

export interface ISectionTaskUpdateIndexReq {
    id: number;
    index: number;
}

export interface ISectionTask {
    id: number;
    actionMode?: ActionMode;
    index: number;
    isExpand: boolean;
    tasks: ITask[];
    title: string;
    viewSectionEditor: boolean;
    viewTaskEditor: boolean;
}

export interface ITaskActionMenuItem {
    id: string;
    children?: ITaskActionMenuSectionItem[];
    click: (task: ITask) => void;
    divider?: boolean;
    icon: string;
    title: string;
}

export interface ITaskActionMenuSectionItem extends ITaskActionMenuItem {
    active: boolean;
    color: string;
    hide: boolean;
}
