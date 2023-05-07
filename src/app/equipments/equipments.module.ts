import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { EquipmentsRoutingModule } from './equipments-routing.module';


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
    SelectButtonModule
  ]
})
export class EquipmentsModule { }
