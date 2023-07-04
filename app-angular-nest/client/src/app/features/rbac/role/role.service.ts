import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataRes } from '@core/models/data-response.model';
import { LoaderService } from '@shared/services/loader.service';
import { Role } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {}


  getData(): Observable<DataRes<Role[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.get<DataRes<Role[]>>('api/roles').pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
