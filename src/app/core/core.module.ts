import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';



@NgModule({
  declarations: [NavbarComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent],
  providers: [ErrorHandlerService]
})
export class CoreModule { }
