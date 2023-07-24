import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeatureAccess } from './access-control.model';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  constructor() {}

  private accessControlSubject: BehaviorSubject<FeatureAccess[]> =
    new BehaviorSubject<FeatureAccess[]>([]);

  public accessControl$: Observable<FeatureAccess[]> =
    this.accessControlSubject.asObservable();

  getDataAccessControl(): Observable<FeatureAccess[]> {
    return this.accessControl$;
  }

  setDataAccessControl(roleRequest: FeatureAccess[]) {
    this.accessControlSubject.next(roleRequest);
  }
}
