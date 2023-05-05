import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';

const routes: Routes = [
  {
    path: 'plants',
    loadChildren: () => import('./plants/plants.module').then(m => m.PlantsModule)
  },
  {
    path: 'areas',
    loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule)
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
