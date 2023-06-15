import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
  ]
})
export class AppComponent implements OnInit {
  sidebarVisible = false;

  constructor(
    private config: PrimeNGConfig, 
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng')
      .subscribe(res => this.config.setTranslation(res));
  }

  showNavbar() {
    return this.router.url !== '/auth/login';
  }

}
