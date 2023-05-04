import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AreaFormComponent } from './area-form/area-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AreaFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    AutoCompleteModule
  ],
  exports: [
    AreaFormComponent
  ]
})
export class AreasModule { }
