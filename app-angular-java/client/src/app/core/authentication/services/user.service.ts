import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/auth";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {
    }

    private user$: BehaviorSubject<User> = new BehaviorSubject<User>({});

    getCurrentUser() {
        // return this.menu$.asObservable();
    }

    get(): Observable<User> {
        return this.user$.asObservable();
    }

    set(user: User): Observable<User> {
        this.user$.next(user);
        return this.user$.asObservable();
    }
}
