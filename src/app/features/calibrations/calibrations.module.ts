import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

import { SharedModule } from '../../shared/shared.module';
import { CalibrationFormComponent } from './calibration-form/calibration-form.component';
import { CalibrationSearchComponent } from './calibration-search/calibration-search.component';
import { CalibrationsRoutingModule } from './calibrations-routing.module';


@NgModule({
  declarations: [
    CalibrationSearchComponent,
    CalibrationFormComponent
  ],
  imports: [
    CommonModule,
    CalibrationsRoutingModule,
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
export class CalibrationsModule { }
