import { Component, OnInit, ViewChild } from '@angular/core';
import { InspectionFilter, InspectionService } from '../inspection.service';
import { Table } from 'primeng/table';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inspection-search',
  templateUrl: './inspection-search.component.html',
  styleUrls: ['./inspection-search.component.scss']
})
export class InspectionSearchComponent implements OnInit {

  statusOptions: any[] = [{label: 'Todas', value: ''}, {label: 'Aguardando relatório', value: 'WAITING_REPORT'}, {label: 'Concluído', value: 'DONE'}];

  inspections = [];
  totalElements: number = 0;
  filter = new InspectionFilter();

  @ViewChild('table') grid!: Table;

  constructor(
    private inspectionService: InspectionService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Inspeções');
    this.search()
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.inspectionService.search(this.filter).subscribe({
      next: res => {
        this.inspections = res.content;
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
      message: 'Tem certeza que deseja excluir a calibração?\nAo confirmar, todos os arquivos e registros também serão excluídos permanentemente.',
      accept: () => {
        this.inspectionService.delete(id).subscribe({
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

  downloadReport(id: number) {
    this.inspectionService.downloadReport(id).subscribe({
      next: (res) => {
        let url = window.URL.createObjectURL(res);
        let a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_inspecao_${id}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

}
