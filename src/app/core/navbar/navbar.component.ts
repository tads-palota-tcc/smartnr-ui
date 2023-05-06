import { Component } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  showMenu = false;

  constructor(public authService: AuthService) {}

  createNewAccessToken() {
    this.authService.getNewAccessToken();
  }
}
