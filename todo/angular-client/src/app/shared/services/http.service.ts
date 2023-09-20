import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoaderService } from "@shared/services/loader.service";
import { finalize, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class HttpService {
    constructor(private http: HttpClient, private loaderService: LoaderService) {
    }

    performRequest<T>(method: string, url: string, data?: any): Observable<T> {
        this.loaderService.isLoading.next(true);

        const requestOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
            body: data
        };

        return this.http.request<T>(method, url, requestOptions).pipe(
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }

    performRequestNotLoading<T>(method: string, url: string, data?: any): Observable<T> {

        const requestOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            }),
            body: data
        };

        return this.http.request<T>(method, url, requestOptions);
    }
}