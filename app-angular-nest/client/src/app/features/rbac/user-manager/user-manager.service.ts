import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { User, UserRequest } from './user-manager.model';
import { HttpClient } from '@angular/common/http';
import { DataRes } from '@shared/model/data-response.model';
import { LoaderService } from '@shared/services/loader.service';
import { RoleRequest } from "../role/role.model";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  private dataEditSubject: BehaviorSubject<UserRequest> =
    new BehaviorSubject<UserRequest>({});

  private dataRoleEditSubject: BehaviorSubject<any> =
    new BehaviorSubject<any>({});

  public dataEdit$: Observable<UserRequest> =
    this.dataEditSubject.asObservable();

  public dataRoleEdit$: Observable<any> =
    this.dataRoleEditSubject.asObservable();

  getDataEdit(): Observable<UserRequest> {
    return this.dataEdit$;
  }

  getDataRoleEdit(): Observable<RoleRequest> {
    return this.dataRoleEdit$;
  }

  setDataEdit(userRequest: UserRequest) {
    this.dataEditSubject.next(userRequest);
  }

  setDataRoleEdit(roleRequest: string[]) {
    this.dataRoleEditSubject.next(roleRequest);
  }

  // API
  getData(): Observable<DataRes<User[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.get<DataRes<User[]>>('api/users').pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  getById(id: number): Observable<DataRes<User>> {
    this.loaderService.isLoading.next(true);

    return this.http.get<DataRes<User>>('api/users/' + id).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  create(data: User): Observable<DataRes<User[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.post<DataRes<User[]>>('api/users', data).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  update(id: string | number, data: User): Observable<DataRes<User[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.patch<DataRes<User[]>>('api/users/' + id, data).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  delete(id: User): Observable<DataRes<User[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.delete<DataRes<User[]>>('api/users/' + id).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  deleteMulti(ids: string[]): Observable<DataRes<User[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.post<DataRes<User[]>>('api/users/delete-multi', ids).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  // get(): Observable<User> {
  // return this.user$.asObservable();
  // }

  // set(user: User): Observable<User> {
  //   this.user$.next(user);
  //   return this.user$.asObservable();
  // }
}
