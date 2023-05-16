import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionsRoutingModule } from './inspections-routing.module';
import { InspectionSearchComponent } from './inspection-search/inspection-search.component';
import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    InspectionSearchComponent,
    InspectionFormComponent
  ],
  imports: [
    CommonModule,
    InspectionsRoutingModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule
  ]
})
export class InspectionsModule { }
