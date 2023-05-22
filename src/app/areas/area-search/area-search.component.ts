import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaFilter, AreaService } from '../area.service';
import { Table } from 'primeng/table';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/security/auth.service';

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

  constructor(
    private areaService: AreaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Área');
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
        this.errorHandler.handle(err);
      }
    });
  }

  onChangePage(event: LazyLoadEvent) {
    const page = event!.first! / event!.rows!
    this.search(page);
  }

  inactivate(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que desena inativar a Área?',
      accept: () => {
        this.areaService.inactivate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Área inativada com sucesso!' });
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
      message: 'Tem certeza que deseja ativar a Área?',
      accept: () => {
        this.areaService.activate(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Área ativada com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }
}
