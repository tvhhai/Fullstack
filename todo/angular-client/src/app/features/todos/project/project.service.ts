import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { IProject, IProjectReq } from "./model/project.model";


@Injectable({
    providedIn: "root",
})
export class ProjectService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getData(): Observable<DataRes<IProject[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<IProject[]>>("api/project-tasks").pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    getById(id: number): Observable<DataRes<IProject>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<IProject>>("api/project-tasks" + "/" + id).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    create(data: IProjectReq): Observable<DataRes<IProject>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<IProject>>("api/project-tasks", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}