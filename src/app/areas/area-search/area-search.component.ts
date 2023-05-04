import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaFilter, AreaService } from '../area.service';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-area-search',
  templateUrl: './area-search.component.html',
  styleUrls: ['./area-search.component.scss']
})
export class AreaSearchComponent implements OnInit {

  statusOptions: any[] = [{label: 'Ativas', value: 'active'}, {label: 'Inativas', value: 'inactive'}];

  areas = [];
  totalElements: number = 0;
  filter = new AreaFilter();

  @ViewChild('table') grid!: Table;

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

  onChangePage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!
    this.search(page);
  }

  inactivate(id: number) {
    this.areaService.inactivate(id).subscribe({
      next: res => {
        this.grid.reset();
      },
      error: err => {
        alert(err.error.userMessage || 'Erro ao inativar registro');
      }
    });
  }

  activate(id: number) {
    this.areaService.activate(id).subscribe({
      next: res => {
        this.grid.reset();
      },
      error: err => {
        alert(err.error.userMessage || 'Erro ao ativar registro');
      }
    });
  }
}
