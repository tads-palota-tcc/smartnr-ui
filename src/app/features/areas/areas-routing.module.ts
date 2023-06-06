import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaSearchComponent } from './area-search/area-search.component';
import { AreaFormComponent } from './area-form/area-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: AreaSearchComponent
  },
  {
    path: 'create',
    component: AreaFormComponent
  },
  {
    path: ':id',
    component: AreaFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule { }
