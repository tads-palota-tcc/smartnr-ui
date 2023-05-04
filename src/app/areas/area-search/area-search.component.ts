import { Component, OnInit } from '@angular/core';
import { AreaFilter, AreaService } from '../area.service';

@Component({
  selector: 'app-area-search',
  templateUrl: './area-search.component.html',
  styleUrls: ['./area-search.component.scss']
})
export class AreaSearchComponent implements OnInit {

  areas = [];

  filter: AreaFilter = {id: '', code: '', name: '', status: 'active', plantCode: ''}

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.search()
  }

  search(): void {
    console.log(this.filter)
    this.areaService.search(this.filter).subscribe({
      next: res => {
        this.areas = res.content
      },
      error: err => {
        alert(err.error.userMessage || 'Aconteceu um erro inesperado no sistema.')
      }
    })
  }
}
