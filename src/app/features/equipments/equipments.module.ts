import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../../shared/shared.module';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { EquipmentsRoutingModule } from './equipments-routing.module';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    EquipmentSearchComponent,
    EquipmentFormComponent
  ],
  imports: [
    CommonModule,
    EquipmentsRoutingModule,
    FormsModule,
    SharedModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule,
    SelectButtonModule,
    TabViewModule,
    InputSwitchModule,
    DividerModule,
    FileUploadModule,
    PanelModule,
    DialogModule
  ]
})
export class EquipmentsModule { }
