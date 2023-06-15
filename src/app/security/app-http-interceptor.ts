import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from '../core/error-handler.service';
import { AuthService } from './auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router, private errorHandler: ErrorHandlerService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (req.url.includes('/assets')) {
        return next.handle(req);
      }
      
      if (!req.url.includes('/auth/refresh-token') && !req.url.includes('/auth/login') && this.auth.isAccessTokenInvalid()) {
        this.auth.getNewAccessToken().subscribe({
          next: (res) => {
            this.auth.storeToken(res.access_token);
            this.auth.storeRefreshToken(res.refresh_token);
          },
          error: (err) => {
            this.errorHandler.handle(err);
          }
        });
      }

      return next.handle(req);
      
    }
}