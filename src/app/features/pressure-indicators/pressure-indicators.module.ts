import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PressureIndicatorsRoutingModule } from './pressure-indicators-routing.module';
import { PressureIndicatorFormComponent } from './pressure-indicator-form/pressure-indicator-form.component';
import { PressureIndicatorSearchComponent } from './pressure-indicator-search/pressure-indicator-search.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    PressureIndicatorFormComponent,
    PressureIndicatorSearchComponent
  ],
  imports: [
    CommonModule,
    PressureIndicatorsRoutingModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    AutoCompleteModule,
    SelectButtonModule,
    TabViewModule,
    InputSwitchModule,
    DividerModule,
    FileUploadModule
  ]
})
export class PressureIndicatorsModule { }
