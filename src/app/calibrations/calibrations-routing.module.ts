import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalibrationFormComponent } from './calibration-form/calibration-form.component';
import { CalibrationSearchComponent } from './calibration-search/calibration-search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: CalibrationSearchComponent
  },
  {
    path: 'create',
    component: CalibrationFormComponent
  },
  {
    path: ':id',
    component: CalibrationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalibrationsRoutingModule { }
