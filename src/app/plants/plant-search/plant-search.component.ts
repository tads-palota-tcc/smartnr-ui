import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantFilter, PlantService } from '../plant.service';
import { PlantSummaryResponse } from '../plant';
import { Page } from 'src/app/shared/model/page';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-plant-search',
  templateUrl: './plant-search.component.html',
  styleUrls: ['./plant-search.component.scss']
})
export class PlantSearchComponent {

  statusOptions: any[] = [{label: 'Ativas', value: 'active'}, {label: 'Inativas', value: 'inactive'}];

  plants: PlantSummaryResponse[] = [];
  totalElements: number = 0;
  filter = new PlantFilter()

  @ViewChild('table') grid!: Table;

  constructor(private plantService: PlantService) {}

  search(page: number = 0): void {
    this.filter.page = page;
    this.plantService.search(this.filter).subscribe({
      next: res => {
        this.plants = res.content;
        this.totalElements = res.totalElements;
      },
      error: err => {
        alert(err.error.userMessage || 'Aconteceu um erro inesperado no sistema.')
      }
    })
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!
    this.search(page);
  }

  inactivate(id: number) {
    this.plantService.inactivate(id).subscribe({
      next: res => {
        this.grid.reset();
      },
      error: err => {
        alert(err.error.userMessage || 'Erro ao inativar registro');
      }
    });
  }

  activate(id: number) {
    this.plantService.activate(id).subscribe({
      next: res => {
        this.grid.reset();
      },
      error: err => {
        alert(err.error.userMessage || 'Erro ao ativar registro');
      }
    });
  }

}
