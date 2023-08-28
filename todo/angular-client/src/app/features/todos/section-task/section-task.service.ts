import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { ISectionTask, ISectionTaskReq } from "./model/section-task.model";


@Injectable({
    providedIn: "root",
})
export class SectionTaskService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getDataByPrjTask(prjTaskId: number): Observable<DataRes<ISectionTask[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<ISectionTask[]>>("api/section-tasks?project-task=" + prjTaskId).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    getById(id: string): Observable<DataRes<ISectionTask>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<ISectionTask>>("api/section-tasks" + "/" + id).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    create(data: ISectionTaskReq): Observable<DataRes<ISectionTask>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<ISectionTask>>("api/section-tasks", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}