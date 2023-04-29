import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {Token} from "../models/auth";
import {TokenService} from "./token.service";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient, private tokenService: TokenService) {
        // console.log(this.baseUrl)
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<Token>('api/auth/signin', {username, password}, httpOptions).pipe(
            tap(token => this.tokenService.set(token))
        );
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(
            'api/auth/signup',
            {
                username,
                email,
                password,
            },
            httpOptions
        );
    }

    getToken() {
        return localStorage.getItem('token');
    }

    check() {
        return !!localStorage.getItem('token');
    }
}
