import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AccessDeniedComponent } from './access-denied.component';



@NgModule({
  declarations: [NavbarComponent, PageNotFoundComponent, AccessDeniedComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent],
  providers: [ErrorHandlerService, Title]
})
export class CoreModule { }
