import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(private authService: AuthService, private errorHandler: ErrorHandlerService) {}

  id = '';
  password = '';

  login() {
    this.authService.login(this.id, this.password).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }
}
