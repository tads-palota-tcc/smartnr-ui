import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent],
  providers: [ErrorHandlerService]
})
export class CoreModule { }
