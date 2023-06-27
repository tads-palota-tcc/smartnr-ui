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

  email = '';
  password = '';
  jwtPayload!: any;

  login() {
    const resultado = this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('LoginForm.login')
        console.log(res);
        this.authService.storeToken(res.access_token);
        this.authService.storeRefreshToken(res.refresh_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

}
