import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments';
import { LoginType, RegisterType, Tokens } from '../../types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data: LoginType){
    return this.http
    .post<Tokens>(`${environment.apiUrl}/login`, data)
    .pipe(
      tap((tokens) => {
        if (tokens.access_token) {
          this.setTokens(tokens);
        }
      })
    );
  }

  register(data: RegisterType){
    return this.http
    .post<Tokens>(`${environment.apiUrl}/register`, data)
    .pipe(
      tap((tokens) => {
        if (tokens.access_token) {
          // this.setTokens(tokens);
        }
      })
    );
  }

  getToken() {
    const access_token = localStorage.getItem('access_token');
    return { access_token };
  }

  isAuthenticated(){ 
    try {
      const token = this.getToken();
      if (token.access_token) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  private setTokens(tokens: Tokens) {
    localStorage.setItem('access_token', tokens.access_token);
  }
}