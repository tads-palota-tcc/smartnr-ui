import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressureSafetyValveFormComponent } from './pressure-safety-valve-form/pressure-safety-valve-form.component';
import { PressureSafetyValveSearchComponent } from './pressure-safety-valve-search/pressure-safety-valve-search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: PressureSafetyValveSearchComponent
  },
  {
    path: 'create',
    component: PressureSafetyValveFormComponent
  },
  {
    path: ':id',
    component: PressureSafetyValveFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressureSafetyValvesRoutingModule { }
