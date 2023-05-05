import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { Title } from '@angular/platform-browser';



@NgModule({
  declarations: [NavbarComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent],
  providers: [ErrorHandlerService, Title]
})
export class CoreModule { }
