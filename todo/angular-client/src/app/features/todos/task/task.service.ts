import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataRes } from "@shared/model";
import {
    IDataSectionTaskReq,
    ISectionTaskReq,
    ITask,
    IListTaskIndexReq,
    ITaskReq, ISectionTask
} from "./model/task.model";
import { HttpService } from "@shared/services/http.service";


@Injectable({
    providedIn: "root",
})
export class TaskService {

    apiTask: string = "api/tasks";
    apiSectionTask: string = "api/section-tasks";

    constructor(private httpService: HttpService) {
    }

    getData(): Observable<DataRes<ITask[]>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask[]>>("get", this.apiTask);
    }

    getDataByPrjTask(prjTask: number): Observable<DataRes<ITask[]>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask[]>>("get", this.apiTask + "?project-task=" + prjTask);
    }

    getById(id: string): Observable<DataRes<ITask>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask>>("get", this.apiTask + "/" + id);
    }

    createTask(data: ITaskReq): Observable<DataRes<ITask>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask>>("post", this.apiTask, data);
    }

    updateTask(id: number, data: ITaskReq): Observable<DataRes<ITask>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask>>("patch", this.apiTask + "/" + id, data);
    }

    updateIndexTask(data: IListTaskIndexReq): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<DataRes<ISectionTaskReq>>("patch", this.apiTask + "/move", data);
    }

    ///////////////////////////// SECTION TASK

    createAndUpdateSection(data: IDataSectionTaskReq): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<DataRes<ISectionTaskReq>>("post", this.apiSectionTask + "/arrange", data);
    }

    updateTitleSection(idSection: number, data: IDataSectionTaskReq): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<DataRes<ISectionTaskReq>>("patch", this.apiSectionTask + "/title/" + idSection, data);
    }

    createSection(data: any): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<DataRes<ISectionTaskReq>>("post", this.apiSectionTask, data);
    }

    deleteSection(idSection: number): Observable<DataRes<ISectionTask>> {
        return this.httpService.performRequestNotLoading<DataRes<ISectionTask>>("delete", this.apiSectionTask + "/" + idSection);
    }
}