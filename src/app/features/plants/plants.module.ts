import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../../shared/shared.module';
import { PlantFormComponent } from './plant-form/plant-form.component';
import { PlantSearchComponent } from './plant-search/plant-search.component';
import { PlantsRoutingModule } from './plants-routing.module';



@NgModule({
  declarations: [
    PlantFormComponent,
    PlantSearchComponent
  ],
  imports: [
    CommonModule,
    PlantsRoutingModule,
    SharedModule,
    FormsModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    SelectButtonModule
  ],
  exports: []
})
export class PlantsModule { }
