import { Component, OnInit } from '@angular/core';
import { PlantFilter, PlantService } from '../plant.service';

@Component({
  selector: 'app-plant-search',
  templateUrl: './plant-search.component.html',
  styleUrls: ['./plant-search.component.scss']
})
export class PlantSearchComponent implements OnInit {

  plants = [];

  filter: PlantFilter = {id: '', code: '', name: '', status: 'active'}

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.search()
  }

  search(): void {
    console.log(this.filter)
    this.plantService.search(this.filter).subscribe({
      next: res => {
        this.plants = res.content
      },
      error: err => {
        alert(err.error.userMessage || 'Aconteceu um erro inesperado no sistema.')
      }
    })
  }
}
