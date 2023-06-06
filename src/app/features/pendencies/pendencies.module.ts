import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../../shared/shared.module';
import { PendenciesRoutingModule } from './pendencies-routing.module';
import { PendencyFormComponent } from './pendency-form/pendency-form.component';
import { PendencySearchComponent } from './pendency-search/pendency-search.component';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    PendencySearchComponent,
    PendencyFormComponent
  ],
  imports: [
    CommonModule,
    PendenciesRoutingModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    AutoCompleteModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule
  ]
})
export class PendenciesModule { }
