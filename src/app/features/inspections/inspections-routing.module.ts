import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InspectionFormComponent } from './inspection-form/inspection-form.component';
import { InspectionSearchComponent } from './inspection-search/inspection-search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: InspectionSearchComponent
  },
  {
    path: 'create',
    component: InspectionFormComponent
  },
  {
    path: ':id',
    component: InspectionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionsRoutingModule { }
