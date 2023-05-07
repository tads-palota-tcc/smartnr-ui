import { Component, OnInit, ViewChild } from '@angular/core';
import { PlantFilter, PlantService } from '../plant.service';
import { PlantSummaryResponse } from '../plant';
import { Page } from 'src/app/shared/model/page';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-plant-search',
  templateUrl: './plant-search.component.html',
  styleUrls: ['./plant-search.component.scss']
})
export class PlantSearchComponent implements OnInit {

  statusOptions: any[] = [{ label: 'Ativas', value: 'active' }, { label: 'Inativas', value: 'inactive' }];

  plants: PlantSummaryResponse[] = [];
  totalElements: number = 0;
  filter = new PlantFilter()

  @ViewChild('table') grid!: Table;

  constructor(
    private plantService: PlantService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Plantas');
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.plantService.search(this.filter).subscribe({
      next: res => {
        this.plants = res.content;
        this.totalElements = res.totalElements;
      },
      error: err => {
        this.errorHandler.handle(err)
      }
    })
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!
    this.search(page);
  }

  inactivate(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que desena inativar a Planta?',
      accept: () => {
        this.plantService.inactivate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Planta inativada com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    })

  }

  activate(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja ativar a Planta?',
      accept: () => {
        this.plantService.activate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Planta ativada com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });

  }

}
