import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
    TabViewModule,
    TableModule,
    TagModule,
    AutoCompleteModule
  ]
})
export class DashboardModule { }
