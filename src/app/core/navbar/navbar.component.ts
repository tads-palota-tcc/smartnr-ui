import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  showMenu = false;

  constructor(public authService: AuthService, public router: Router) {}

  logout() {
    console.log('Logout')
    this.authService.clearAccessToken();
    this.router.navigate(['auth/login']);
  }
  
}
