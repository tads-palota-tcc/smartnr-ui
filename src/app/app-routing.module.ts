import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { AuthGuard } from './security/auth.guard';
import { AccessDeniedComponent } from './core/access-denied.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {roles: ['REPORTS_READ']}
  },
  {
    path: 'plants',
    loadChildren: () => import('./features/plants/plants.module').then(m => m.PlantsModule),
    canActivate: [AuthGuard],
    data: {roles: ['INSTALATION_READ', 'INSTALATION_WRITE']}
  },
  {
    path: 'areas',
    loadChildren: () => import('./features/areas/areas.module').then(m => m.AreasModule),
    canActivate: [AuthGuard],
    data: {roles: ['INSTALATION_READ', 'INSTALATION_WRITE']}
  },
  {
    path: 'equipments',
    loadChildren: () => import('./features/equipments/equipments.module').then(m => m.EquipmentsModule),
    canActivate: [AuthGuard],
    data: {roles: ['EQUIPMENT_READ', 'EQUIPMENT_WRITE']}
  },
  {
    path: 'pressure-indicators',
    loadChildren: () => import('./features/pressure-indicators/pressure-indicators.module').then(m => m.PressureIndicatorsModule),
    canActivate: [AuthGuard],
    data: {roles: ['EQUIPMENT_READ', 'EQUIPMENT_WRITE']}
  },
  {
    path: 'pressure-safety-valves',
    loadChildren: () => import('./features/pressure-safety-valves/pressure-safety-valves.module').then(m => m.PressureSafetyValvesModule),
    canActivate: [AuthGuard],
    data: {roles: ['EQUIPMENT_READ', 'EQUIPMENT_WRITE']}
  },
  {
    path: 'calibrations',
    loadChildren: () => import('./features/calibrations/calibrations.module').then(m => m.CalibrationsModule),
    canActivate: [AuthGuard],
    data: {roles: ['EQUIPMENT_READ', 'EQUIPMENT_WRITE']}
  },
  {
    path: 'inspections',
    loadChildren: () => import('./features/inspections/inspections.module').then(m => m.InspectionsModule),
    canActivate: [AuthGuard],
    data: {roles: ['EQUIPMENT_READ', 'EQUIPMENT_WRITE']}
  },
  {
    path: 'pendencies',
    loadChildren: () => import('./features/pendencies/pendencies.module').then(m => m.PendenciesModule),
    canActivate: [AuthGuard],
    data: {roles: ['ACTIONS_READ', 'REPORTS_READ']}
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
