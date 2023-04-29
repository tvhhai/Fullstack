import { Injectable } from '@angular/core';
import {Token} from "../models/auth";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  // private change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  // private refresh$ = new Subject<BaseToken | undefined>();
  // private timer$?: Subscription;
  //
  // private _token?: BaseToken;
  constructor() { }

  set(token?: Token): TokenService {
    this.save(token);

    return this;
  }

  private save(token?: Token): void {

    localStorage['token'] = token?.access_token;
    console.log(token)
    // this._token = undefined;
    //
    // if (!token) {
    //   this.store.remove(this.key);
    // } else {
    //   const value = Object.assign({ access_token: '', token_type: 'Bearer' }, token, {
    //     exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
    //   });
    //   this.store.set(this.key, filterObject(value));
    // }
    //
    // this.change$.next(this.token);
    // this.buildRefresh();
  }
}
