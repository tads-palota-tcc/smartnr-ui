import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';

import { CalibrationFilter, CalibrationService } from '../calibration.service';

@Component({
  selector: 'app-calibration-search',
  templateUrl: './calibration-search.component.html',
  styleUrls: ['./calibration-search.component.scss']
})
export class CalibrationSearchComponent implements OnInit {

  statusOptions: any[] = [{label: 'Todas', value: ''}, {label: 'Aguardando relatório', value: 'WAITING_REPORT'}, {label: 'Concluído', value: 'DONE'}];

  calibrations = [];
  totalElements: number = 0;
  filter = new CalibrationFilter();

  @ViewChild('table') grid!: Table;

  constructor(
    private calibrationService: CalibrationService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Calibrações');
    this.search()
  }

  search(page: number = 0): void {
    this.filter.page = page;
    this.calibrationService.search(this.filter).subscribe({
      next: res => {
        this.calibrations = res.content;
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

  delete(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir a calibração?\nAo confirmar, todos os arquivos e registros também serão excluídos permanentemente.',
      accept: () => {
        this.calibrationService.delete(id).subscribe({
          next: res => {
            this.grid.reset();
            this.messageService.add({ severity: 'success', detail: 'Calibração excluída com sucesso!' });
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

  downloadReport(id: number) {
    this.calibrationService.downloadReport(id).subscribe({
      next: (res) => {
        let url = window.URL.createObjectURL(res);
        let a = document.createElement('a');
        a.href = url;
        a.download = `certificado_calibracao_${id}`;
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
