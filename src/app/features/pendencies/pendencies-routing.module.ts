import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendencySearchComponent } from './pendency-search/pendency-search.component';
import { PendencyFormComponent } from './pendency-form/pendency-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: PendencySearchComponent
  },
  {
    path: ':id',
    component: PendencyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendenciesRoutingModule { }
