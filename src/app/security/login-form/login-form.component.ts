import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService) {
  }

  email = 'alexandre.palota@gmail.com';
  password = '123456';
  jwtPayload!: any;

  login() {
    const resultado = this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.storeToken(res.access_token);
        this.authService.storeRefreshToken(res.refresh_token);
        this.router.navigate(['/plants']);
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

}
