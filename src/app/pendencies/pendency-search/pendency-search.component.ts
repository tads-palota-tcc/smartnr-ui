import { Component, OnInit, ViewChild } from '@angular/core';
import { PendencyFilter, PendencyService } from '../pendency.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pendency-search',
  templateUrl: './pendency-search.component.html',
  styleUrls: ['./pendency-search.component.scss']
})
export class PendencySearchComponent implements OnInit {

  pendencies = [];
  totalElements: number = 0;
  filter = new PendencyFilter();

  @ViewChild('table') grid!: Table;

  constructor(
    private pendencyService: PendencyService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Pendências');
    this.search()
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.pendencyService.search(this.filter).subscribe({
      next: res => {
        this.pendencies = res.content;
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

  delete(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir a pendência?\nAo confirmar, não será possível recuperar os dados.',
      accept: () => {
        this.pendencyService.delete(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Inspeção excluída com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

}
