import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataRes } from '@core/models/data-response.model';
import { LoaderService } from '@shared/services/loader.service';
import { Role, RoleRequest, RoleResponse } from './role.model';
import { FeatureAccessResponse } from '../access-control/access-control.model';
import { RoleConstant } from './constants/role.constants';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  private dataEditSubject: BehaviorSubject<RoleRequest> =
    new BehaviorSubject<RoleRequest>({
      name: '',
      description: '',
      permissions: [],
    });

  public dataEdit$: Observable<RoleRequest> =
    this.dataEditSubject.asObservable();

  getDataEdit(): Observable<RoleRequest> {
    return this.dataEdit$;
  }

  setDataEdit(roleRequest: RoleRequest) {
    this.dataEditSubject.next(roleRequest);
  }

  getData(): Observable<DataRes<Role[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.get<DataRes<Role[]>>(RoleConstant.API).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  getById(id: number): Observable<DataRes<Role>> {
    this.loaderService.isLoading.next(true);

    return this.http.get<DataRes<Role>>(RoleConstant.API + id).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  create(data: Role): Observable<RoleResponse> {
    this.loaderService.isLoading.next(true);

    return this.http.post<RoleResponse>(RoleConstant.API, data).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  update(id: number, data: Role): Observable<RoleResponse> {
    this.loaderService.isLoading.next(true);

    return this.http.patch<RoleResponse>(RoleConstant.API + id, data).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  delete(id: number): Observable<DataRes<Role[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.delete<DataRes<Role[]>>(RoleConstant.API + id).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  deleteMulti(ids: number[]): Observable<DataRes<Role[]>> {
    this.loaderService.isLoading.next(true);

    return this.http
      .post<DataRes<Role[]>>(RoleConstant.API_DELETE_MULTI, ids)
      .pipe(
        finalize(() => {
          this.loaderService.isLoading.next(false);
        })
      );
  }

  getPermission(): Observable<FeatureAccessResponse> {
    this.loaderService.isLoading.next(true);

    return this.http.get<FeatureAccessResponse>('api/featureAccess').pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
