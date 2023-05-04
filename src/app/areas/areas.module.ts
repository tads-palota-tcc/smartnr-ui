import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../shared/shared.module';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreaSearchComponent } from './area-search/area-search.component';



@NgModule({
  declarations: [
    AreaFormComponent,
    AreaSearchComponent
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
    AutoCompleteModule,
    SelectButtonModule
  ],
  exports: [
    AreaFormComponent,
    AreaSearchComponent
  ]
})
export class AreasModule { }
