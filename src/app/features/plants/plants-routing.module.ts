import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantSearchComponent } from './plant-search/plant-search.component';
import { PlantFormComponent } from './plant-form/plant-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: PlantSearchComponent
  },
  {
    path: 'create',
    component: PlantFormComponent
  },
  {
    path: ':id',
    component: PlantFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantsRoutingModule { }
