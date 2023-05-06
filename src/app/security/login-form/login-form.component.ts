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
  }

  email = 'alexandre.palota@gmail.com';
  password = '123456';
  jwtPayload!: any;

  login() {
    const resultado = this.authService.login(this.email, this.password);
    console.log(resultado);
  }

}
