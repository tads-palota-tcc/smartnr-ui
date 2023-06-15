import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Test } from 'src/app/core/model/applicable-tests';
import { Inspection } from 'src/app/core/model/Inspection';
import { Plant } from 'src/app/core/model/plant';
import { EquipmentService } from 'src/app/features/equipments/equipment.service';
import { PlantService } from 'src/app/features/plants/plant.service';
import { AuthService } from 'src/app/security/auth.service';

import { InspectionService } from '../inspection.service';
import { PendencyService } from 'src/app/features/pendencies/pendency.service';
import { Table } from 'primeng/table';
import { PendencyResponse } from 'src/app/core/model/pendency';
import { PendencyCreationRequest } from 'src/app/core/model/pendency';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent implements OnInit {

  inspection = new Inspection();

  plants: any[] = [];
  equipments: any[] = [];
  tests: Test[] = []
  statusOptions: any[] = [{label: 'Aguardando relatório', value: 'WAITING_REPORT'}, {label: 'Concluído', value: 'DONE'}];

  selectedPlant = new Plant();
  selectedTest = new Test();

  pendencies: PendencyResponse[] = []
  pendencyToSave = new PendencyCreationRequest();
  pendencyDialogVisible = false;
  pendencyTypeOptions: any[] = [
    {label: 'Obrigatória', value: 'MANDATORY'},
    {label: 'Recomendada', value: 'RECOMMENDATION'},
    {label: 'Opcional', value: 'OPTIONAL'}
  ];
  pendencyStatusOptions: any[] = [
    {label: 'Aberto', value: 'STARTED'},
    {label: 'Concluído', value: 'COMPLETED'},
    {label: 'Cancelado', value: 'CANCELED'}
  ];

  pendencyResponsibleOptions: any [] = [];

  @ViewChild('pendencyTable') grid!: Table;

  constructor(
    public inspectionService: InspectionService,
    public plantService: PlantService,
    public pendencyService: PendencyService,
    public equipmentService: EquipmentService,
    public auth: AuthService,
    public messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Inspeção');
    const id = this.route.snapshot.params['id'];
    this.loadTests();
    if (id) {
      this.title.setTitle('Atualização de Inspeção')
      this.loadInspection(id);
    }
  }

  get updating(): boolean {
    return Boolean(this.inspection.id);
  }

  get urlUploadReport(): string {
    return `${this.inspectionService.baseUrl}/${this.inspection.id}/reports`;
  }

  get uploadHeaders() {
    return this.inspectionService.uploadHeaders();
  }

  updatePlantList(event: string) {
    this.plantService.findTopPlants(event).subscribe({
      next: res => {
        this.plants = res;
      }
    });
  }

  updateEquipmentList(tag: string) {
    this.equipmentService.findByPlantCodeAndTag(this.selectedPlant?.code || '', tag).subscribe({
      next: res => {
        this.equipments = res;
      }
    });
  }

  updateResponsibleList(event: string) {
    this.userService.findTop10ByName(event).subscribe({
      next: res => {
        this.pendencyResponsibleOptions = res;
      }
    });
  }

  loadTests() {
    this.inspectionService.findTests().subscribe({
      next: (res) => {
        this.tests = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
  }

  loadInspection(id: number) {
    this.inspectionService.findById(id).subscribe({
      next: (res) => {
        this.inspection = res;
        this.selectedPlant = res.equipment.area.plant;
        this.selectedTest = res.test;
        this.inspection.executionDate = new Date(this.inspection.executionDate)
        this.loadPendencies();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  loadPendencies() {
    this.inspectionService.findPendenciesByInspection(this.inspection.id).subscribe({
      next: (res) => {
        this.pendencies = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  save(form: NgForm) {
    if (this.inspection.id) {
      this.update(this.inspection.id, form);
    } else {
      this.create(form);
    }
  }

  private create(form: NgForm) {
    this.inspectionService.create(this.inspection).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Inspeção cadastrado com Id=${res.id}`});
        this.router.navigate([`/inspections/${res.id}`])
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.inspectionService.update(id, this.inspection).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Indicador de Pressão atualizado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newInspection(form: NgForm) {
    form.reset();
    this.inspection = new Inspection();
    this.router.navigate(['/inspections/create']);
  }

  onSelectTest(testId: number) {
    for (let test of this.tests) {
      if (test.id === testId) {
        this.inspection.test = test;
        return;
      }
    }
  }

  afterUpload() {
    this.messageService.add({severity: 'success', detail: 'Arquivo anexado com sucesso'});
    this.loadInspection(this.inspection.id);
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

  deleteReport() {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir o relatório?\nAo confirmar, não será possível recuperar o arquivo.',
      accept: () => {
        this.inspectionService.deleteReport(this.inspection.id).subscribe({
          next: res => {
            this.messageService.add({severity: 'success', detail: 'Relatório excluído com sucesso'});
            this.loadInspection(this.inspection.id);
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

  deletePendency(id: number) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir a pendência?\nAo confirmar, não será possível recuperar os dados.',
      accept: () => {
        this.pendencyService.delete(id).subscribe({
          next: res => {
            this.messageService.add({severity: 'success', detail: 'Pendência excluída com sucesso'});
            this.loadPendencies();
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

  editPendency(id: number) {
    this.pendencyService.findById(id).subscribe({
      next: (res) => {
        this.pendencyToSave = res;
        this.pendencyToSave.deadLine = new Date(this.pendencyToSave.deadLine);
        this.pendencyDialogVisible = true;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
  }

  savePendency() {
    this.pendencyToSave.inspection.id = this.inspection.id;
    if (!this.pendencyToSave.id) {
      this.createPendency();
    } else {
      this.updatePendency();
    }
  }

  private createPendency() {
    this.pendencyService.create(this.pendencyToSave).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Pendência salva com sucesso'});
        this.loadPendencies();
        this.pendencyToSave = new PendencyCreationRequest();
        this.pendencyDialogVisible = false;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private updatePendency() {
    this.pendencyService.update(this.pendencyToSave.id || 0, this.pendencyToSave).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Pendência salva com sucesso'});
        this.loadPendencies();
        this.pendencyToSave = new PendencyCreationRequest();
        this.pendencyDialogVisible = false;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

}
