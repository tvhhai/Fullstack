import { LoaderService } from '@shared/services/loader.service';
import { GlobalConfig } from 'ngx-toastr/toastr/toastr-config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, finalize, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private toast: ToastrService,
    private _snackBar: MatSnackBar
  ) {}

  private toastConfig: Partial<GlobalConfig> = {
    closeButton: true,
    positionClass: 'toast-bottom-left',
    timeOut: 50000000,
  };

  performRequest<T>(method: string, url: string, data?: any): Observable<T> {
    this.loaderService.isLoading.next(true);

    return this.http.request<T>(method, url, this.requestOptions(data)).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  performRequestNotLoading<T>(
    method: string,
    url: string,
    data?: any
  ): Observable<T> {
    return this.http.request<T>(method, url, this.requestOptions(data));
  }

  performRequestWithToast<T>(
    method: string,
    url: string,
    data?: any
  ): Observable<T> {
    return this.http.request<T>(method, url, this.requestOptions(data)).pipe(
      tap(res => {
        const message = this.getMessage(res);
        this.toast.success(message, '', this.toastConfig);
        // this._snackBar.open(message);
      }),
      catchError(error => {
        const message = this.getMessage(error);
        this.toast.error(message, '', this.toastConfig);
        throw error;
      })
    );
  }

  private getMessage(response: any): string {
    return response.message;
  }

  private requestOptions(data: any) {
    return {
      body: data,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
