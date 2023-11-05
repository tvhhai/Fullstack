import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { User } from '../models/auth';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private currentUserSubject: BehaviorSubject<User> =
        new BehaviorSubject<User>({
            id: '',
            avatar: '',
            email: '',
            firstName: '',
            lastName: '',
            permissions: [],
            roles: [],
            username: '',
        });

    public currentUser$: Observable<User> =
        this.currentUserSubject.asObservable();

    public backToUrlAfterCloseSettingDialog = '';

    constructor() {}

    getCurrentUserObj() {
        return this.currentUserSubject.getValue();
    }

    set(user: User) {
        this.currentUserSubject.next(user);
    }

    get(): Observable<User> {
        return this.currentUser$;
    }
}
