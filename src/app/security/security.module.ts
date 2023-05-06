import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SecurityRoutingModule } from './security-routing.module';


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  providers: []
})
export class SecurityModule { }
