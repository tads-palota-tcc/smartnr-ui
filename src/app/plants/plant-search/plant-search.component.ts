import { Component, OnInit } from '@angular/core';
import { PlantFilter, PlantService } from '../plant.service';
import { PlantSummaryResponse } from '../plant';
import { Page } from 'src/app/shared/model/page';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-plant-search',
  templateUrl: './plant-search.component.html',
  styleUrls: ['./plant-search.component.scss']
})
export class PlantSearchComponent {

  plants: PlantSummaryResponse[] = [];
  totalElements: number = 0;
  filter = new PlantFilter()

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
}
