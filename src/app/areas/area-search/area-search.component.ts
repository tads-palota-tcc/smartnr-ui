import { Component, OnInit } from '@angular/core';
import { AreaFilter, AreaService } from '../area.service';

@Component({
  selector: 'app-area-search',
  templateUrl: './area-search.component.html',
  styleUrls: ['./area-search.component.scss']
})
export class AreaSearchComponent implements OnInit {

  areas = [];
  totalElements: number = 0;
  filter = new AreaFilter();

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.search()
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.areaService.search(this.filter).subscribe({
      next: res => {
        this.areas = res.content;
        this.totalElements = res.totalElements;
      },
      error: err => {
        alert(err.error.userMessage || 'Aconteceu um erro inesperado no sistema.')
      }
    })
  }
}
