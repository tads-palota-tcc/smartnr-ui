import { Component, OnInit, ViewChild } from '@angular/core';
import { PressureIndicatorFilter, PressureIndicatorService } from '../pressure-indicator.service';
import { Table } from 'primeng/table';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { PressureIndicator } from 'src/app/core/model/pressure-indicator';

@Component({
  selector: 'app-pressure-indicator-search',
  templateUrl: './pressure-indicator-search.component.html',
  styleUrls: ['./pressure-indicator-search.component.scss']
})
export class PressureIndicatorSearchComponent implements OnInit {

  statusOptions: any[] = [{ label: 'Ativos', value: 'active' }, { label: 'Inativos', value: 'inactive' }];

  pressureIndicators: PressureIndicator[] = [];
  totalElements: number = 0;
  filter = new PressureIndicatorFilter();

  @ViewChild('table') grid!: Table;

  constructor(
    private pressureIndicatorService: PressureIndicatorService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Indicadores de Pressão');
    this.search()
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.pressureIndicatorService.search(this.filter).subscribe({
      next: res => {
        this.pressureIndicators = res.content;
        this.totalElements = res.totalElements;
      },
      error: err => {
        this.errorHandler.handle(err);
      }
    })
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!
    this.search(page);
  }

  inactivate(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que desena inativar o Indicador de Pressão?',
      accept: () => {
        this.pressureIndicatorService.inactivate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Indicador de Pressão inativado com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

  activate(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja ativar o Indicador de Pressão?',
      accept: () => {
        this.pressureIndicatorService.activate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Indicador de Pressão ativado com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }
}
