import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';

import { EquipmentFilter, EquipmentService } from '../equipment.service';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss']
})
export class EquipmentSearchComponent implements OnInit {

  statusOptions: any[] = [{label: 'Ativos', value: 'active'}, {label: 'Inativos', value: 'inactive'}];

  equipments = [];
  totalElements: number = 0;
  filter = new EquipmentFilter();

  @ViewChild('table') grid!: Table;

  constructor(
    private equipmentService: EquipmentService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Equipamentos');
    this.search()
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.equipmentService.search(this.filter).subscribe({
      next: res => {
        this.equipments = res.content;
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
      message: 'Tem certeza que desena inativar o Equipamento?',
      accept: () => {
        this.equipmentService.inactivate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Equipamento inativado com sucesso!' });
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
      message: 'Tem certeza que deseja ativar o Equipamento?',
      accept: () => {
        this.equipmentService.activate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Equipamento ativado com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

}
