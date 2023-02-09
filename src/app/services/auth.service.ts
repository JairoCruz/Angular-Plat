import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './token.service';
import { switchMap, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/auth';
  private user = new BehaviorSubject<User | null>(null);
  // user$ is a observable
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }


  profile() {
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      /* headers: {
        Authorization: `Bearer ${token}`,
      } */
    })
    .pipe(
      tap(user => this.user.next(user))
    );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile()),
    )
  }

  logout() {
    this.tokenService.removeToken();
  }

}
