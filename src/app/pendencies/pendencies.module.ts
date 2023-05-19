import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendenciesRoutingModule } from './pendencies-routing.module';
import { PendencySearchComponent } from './pendency-search/pendency-search.component';
import { PendencyFormComponent } from './pendency-form/pendency-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


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
    DropdownModule,
    CalendarModule,
    InputTextareaModule
  ]
})
export class PendenciesModule { }
