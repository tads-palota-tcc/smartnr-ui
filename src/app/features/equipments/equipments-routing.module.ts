import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: EquipmentSearchComponent
  },
  {
    path: 'create',
    component: EquipmentFormComponent
  },
  {
    path: ':id',
    component: EquipmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsRoutingModule { }
