import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isAccessTokenInvalid() && this.auth.isRefreshTokenInvalid()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    if (route.data['roles'] && !this.auth.hasAnyRole(route.data['roles'])) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
  
}
