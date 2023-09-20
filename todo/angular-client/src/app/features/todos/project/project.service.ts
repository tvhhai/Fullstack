import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataRes } from "@shared/model";
import { IProject, IProjectReq } from "./model/project.model";
import { HttpService } from "@shared/services/http.service";

@Injectable({
    providedIn: "root",
})
export class ProjectService {

    apiPrjTask: string = "api/project-tasks";

    constructor(private httpService: HttpService) {
    }

    getData(): Observable<DataRes<IProject[]>> {
        return this.httpService.performRequest<DataRes<IProject[]>>("get", this.apiPrjTask);
    }

    getById(id: number): Observable<DataRes<IProject>> {
        return this.httpService.performRequestNotLoading<DataRes<IProject>>("get", this.apiPrjTask + "/" + id);
    }

    create(data: IProjectReq): Observable<DataRes<IProject>> {
        return this.httpService.performRequest<DataRes<IProject>>("post", this.apiPrjTask, data);
    }

    update(prjId: number, data: IProjectReq): Observable<DataRes<IProject>> {
        return this.httpService.performRequest<DataRes<IProject>>("patch", this.apiPrjTask + "/" + prjId, data);
    }
}