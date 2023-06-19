import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { User } from './user-manager.model';
import { HttpClient } from '@angular/common/http';
import { DataRes } from '@core/models/data-response.model';
import { LoaderService } from '@shared/services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  // private user$: BehaviorSubject<User> = new BehaviorSubject<User>({});

  getData(): Observable<DataRes<User[]>> {
    this.loaderService.isLoading.next(true);

    return this.http.get<DataRes<User[]>>('api/users').pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }

  getById(id: User): Observable<DataRes<User>> {
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
