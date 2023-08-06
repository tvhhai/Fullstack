import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/auth";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor() {
    }

    private currentUserSubject: BehaviorSubject<User> =
        new BehaviorSubject<User>({});

    public currentUser$: Observable<User> =
        this.currentUserSubject.asObservable();

    getCurrentUserObj() {
        return this.currentUserSubject.getValue();
    }

    get(): Observable<User> {
        return this.currentUser$;
    }

    set(user: User) {
        this.currentUserSubject.next(user);
    }
}
