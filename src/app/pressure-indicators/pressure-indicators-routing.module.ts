import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressureIndicatorSearchComponent } from './pressure-indicator-search/pressure-indicator-search.component';
import { PressureIndicatorFormComponent } from './pressure-indicator-form/pressure-indicator-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: PressureIndicatorSearchComponent
  },
  {
    path: 'create',
    component: PressureIndicatorFormComponent
  },
  {
    path: ':id',
    component: PressureIndicatorFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressureIndicatorsRoutingModule { }
