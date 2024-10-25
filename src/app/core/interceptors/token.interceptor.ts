import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/auth/login') || req.url.endsWith('/auth/register')) {
      return next.handle(req);
    }
    
    const authToken = this.authSrv.getToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken.access_token}`)
    });

    return next.handle(authReq);
  }
}
