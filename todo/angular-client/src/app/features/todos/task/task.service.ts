import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { IDataSectionTaskReq, ISectionTaskReq, ITask, ITaskReq } from "./model/task.model";


@Injectable({
    providedIn: "root",
})
export class TaskService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getData(): Observable<DataRes<ITask[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<ITask[]>>("api/tasks").pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    getDataByPrjTask(prjTask: number): Observable<DataRes<ITask[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<ITask[]>>("api/tasks?project-task=" + prjTask).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    getById(id: string): Observable<DataRes<ITask>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<ITask>>("api/tasks" + "/" + id).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    createTask(data: ITaskReq): Observable<DataRes<ITask>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<ITask>>("api/tasks", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    createAndUpdateSection(data: IDataSectionTaskReq): Observable<DataRes<ISectionTaskReq>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<ISectionTaskReq>>("api/section-tasks/arrange", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    createSection(data: any): Observable<DataRes<ISectionTaskReq>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<ISectionTaskReq>>("api/section-tasks", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }


}