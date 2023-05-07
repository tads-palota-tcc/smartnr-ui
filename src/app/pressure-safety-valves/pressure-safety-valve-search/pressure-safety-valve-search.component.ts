import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';

import { PressureSafetyValveFilter, PressureSafetyValveService } from '../pressure-safety-valve.service';

@Component({
  selector: 'app-pressure-safety-valve-search',
  templateUrl: './pressure-safety-valve-search.component.html',
  styleUrls: ['./pressure-safety-valve-search.component.scss']
})
export class PressureSafetyValveSearchComponent implements OnInit {

  statusOptions: any[] = [{ label: 'Ativos', value: 'active' }, { label: 'Inativos', value: 'inactive' }];

  pressureSafetyValves = [];
  totalElements: number = 0;
  filter = new PressureSafetyValveFilter();

  @ViewChild('table') grid!: Table;

  constructor(
    private pressureSafetyValveService: PressureSafetyValveService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Válvulas de Segurança');
    this.search()
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.pressureSafetyValveService.search(this.filter).subscribe({
      next: res => {
        this.pressureSafetyValves = res.content;
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
      message: 'Tem certeza que desena inativar a Válvula de Segurança?',
      accept: () => {
        this.pressureSafetyValveService.inactivate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Válvula de Segurança inativada com sucesso!' });
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
      message: 'Tem certeza que deseja ativar a Válvula de Segurança?',
      accept: () => {
        this.pressureSafetyValveService.activate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Válvula de Segurança ativada com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

}
