import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PressureSafetyValvesRoutingModule } from './pressure-safety-valves-routing.module';
import { PressureSafetyValveSearchComponent } from './pressure-safety-valve-search/pressure-safety-valve-search.component';
import { PressureSafetyValveFormComponent } from './pressure-safety-valve-form/pressure-safety-valve-form.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
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
    PressureSafetyValveSearchComponent,
    PressureSafetyValveFormComponent
  ],
  imports: [
    CommonModule,
    PressureSafetyValvesRoutingModule,
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
export class PressureSafetyValvesModule { }
