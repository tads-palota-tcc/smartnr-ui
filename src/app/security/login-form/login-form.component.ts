import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(
    public authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private errorHandler: ErrorHandlerService) {
    this.loadToken();
  }

  id = '';
  password = '';
  jwtPayload!: any;

  login() {
    this.authService.login(this.id, this.password).subscribe({
      next: (res) => {
        this.storeToken(res.access_token);
        this.router.navigate(['/plants']);
      },
      error: (err) => {
        this.errorHandler.handle(err);
        this.password = '';
      }
    })
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }

}
