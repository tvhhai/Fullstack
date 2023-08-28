import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { Project, ProjectReq } from "./model/project.model";


@Injectable({
    providedIn: "root",
})
export class ProjectService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    getData(): Observable<DataRes<Project[]>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<Project[]>>("api/project-tasks").pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    getById(id: number): Observable<DataRes<Project>> {
        this.loaderService.isLoading.next(true);

        return this.http.get<DataRes<Project>>("api/project-tasks" + "/" + id).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    create(data: ProjectReq): Observable<DataRes<Project>> {
        this.loaderService.isLoading.next(true);

        return this.http.post<DataRes<Project>>("api/project-tasks", data).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}