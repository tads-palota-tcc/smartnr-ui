import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantFormComponent } from './plant-form/plant-form.component';
import { PlantSearchComponent } from './plant-search/plant-search.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    PlantFormComponent,
    PlantSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule
  ],
  exports: [
    PlantFormComponent,
    PlantSearchComponent
  ]
})
export class PlantsModule { }
