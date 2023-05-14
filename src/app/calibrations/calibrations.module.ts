import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalibrationsRoutingModule } from './calibrations-routing.module';
import { CalibrationSearchComponent } from './calibration-search/calibration-search.component';
import { CalibrationFormComponent } from './calibration-form/calibration-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


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
  ]
})
export class CalibrationsModule { }
