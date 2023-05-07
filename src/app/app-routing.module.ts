import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { AuthGuard } from './security/auth.guard';
import { AccessDeniedComponent } from './core/access-denied.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'plants',
    loadChildren: () => import('./plants/plants.module').then(m => m.PlantsModule),
    canActivate: [AuthGuard],
    data: {roles: ['INSTALATION_READ', 'INSTALATION_WRITE']}
  },
  {
    path: 'areas',
    loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule),
    canActivate: [AuthGuard],
    data: {roles: ['INSTALATION_READ', 'INSTALATION_WRITE']}
  },
  {
    path: 'equipments',
    loadChildren: () => import('./equipments/equipments.module').then(m => m.EquipmentsModule),
    canActivate: [AuthGuard],
    data: {roles: ['EQUIPMENT_READ', 'EQUIPMENT_WRITE']}
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
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
