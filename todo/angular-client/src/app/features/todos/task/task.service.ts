import { HttpService } from '@shared/services/http.service';
import { Injectable } from '@angular/core';
import { DataRes } from '@shared/model';
import { Observable } from 'rxjs';

import {
    IDataSectionTaskReq,
    IListTaskIndexReq,
    ISectionTaskReq,
    ISectionTask,
    ITaskReq,
    ITask,
} from './model/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    apiTask = 'api/tasks';
    apiSectionTask = 'api/section-tasks';

    constructor(private httpService: HttpService) {}

    getData(): Observable<DataRes<ITask[]>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask[]>>(
            'get',
            this.apiTask
        );
    }

    getDataByPrjTask(prjTask: number): Observable<DataRes<ITask[]>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask[]>>(
            'get',
            this.apiTask + '?project-task=' + prjTask
        );
    }

    getById(id: string): Observable<DataRes<ITask>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask>>(
            'get',
            this.apiTask + '/' + id
        );
    }

    createTask(data: ITaskReq): Observable<DataRes<ITask>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask>>(
            'post',
            this.apiTask,
            data
        );
    }

    updateTask(id: number, data: ITaskReq): Observable<DataRes<ITask>> {
        return this.httpService.performRequestNotLoading<DataRes<ITask>>(
            'patch',
            this.apiTask + '/' + id,
            data
        );
    }

    updateIndexTask(
        data: IListTaskIndexReq
    ): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<
            DataRes<ISectionTaskReq>
        >('patch', this.apiTask + '/move', data);
    }

    deleteTask(id: number): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<
            DataRes<ISectionTaskReq>
        >('delete', this.apiTask + '/' + id);
    }

    ///////////////////////////// SECTION TASK

    createAndUpdateSection(
        data: IDataSectionTaskReq
    ): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<
            DataRes<ISectionTaskReq>
        >('post', this.apiSectionTask + '/arrange', data);
    }

    updateTitleSection(
        idSection: number,
        data: IDataSectionTaskReq
    ): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<
            DataRes<ISectionTaskReq>
        >('patch', this.apiSectionTask + '/title/' + idSection, data);
    }

    createSection(data: any): Observable<DataRes<ISectionTaskReq>> {
        return this.httpService.performRequestNotLoading<
            DataRes<ISectionTaskReq>
        >('post', this.apiSectionTask, data);
    }

    deleteSection(idSection: number): Observable<DataRes<ISectionTask>> {
        return this.httpService.performRequestNotLoading<DataRes<ISectionTask>>(
            'delete',
            this.apiSectionTask + '/' + idSection
        );
    }
}
