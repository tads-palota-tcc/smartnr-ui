import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AreaService } from 'src/app/features/areas/area.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Equipment } from 'src/app/core/model/equipment';
import { AuthService } from 'src/app/security/auth.service';

import { EquipmentService } from '../equipment.service';
import { PressureIndicator } from 'src/app/core/model/pressure-indicator';
import { Area } from 'src/app/core/model/area';
import { PressureIndicatorService } from 'src/app/features/pressure-indicators/pressure-indicator.service';
import { PressureSafetyValveService } from 'src/app/features/pressure-safety-valves/pressure-safety-valve.service';
import { PressureSafetyValve } from 'src/app/core/model/pressure-safety-valve';
import { ApplicableTest, ApplicableTestResponse, Test } from 'src/app/core/model/applicable-tests';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit {

  areas: Area[] = []

  availablePressureIndicators: PressureIndicator[] = [];
  pressureIndicatorToBind = new PressureIndicator();
  pressureIndicatorDialogVisible = false;

  availablePressureSafetyValves: PressureSafetyValve[] = [];
  pressureSafetyValveToBind = new PressureSafetyValve();
  pressureSafetyValveDialogVisible = false;

  tests: Test[] = [];
  applicableTestToAdd = new ApplicableTest();
  applicableTestDialogVisible = false;
  frequencyTypes: {label: string, value: string}[] = [
    {label: 'Dias', value: 'DAY'},
    {label: 'Meses', value: 'MONTH'},
    {label: 'Anos', value: 'YEAR'}
  ];
  
  fluidClasses: {code: string, description: string}[] = [
    {code: 'A', description: 'CLASSE “A”'},
    {code: 'B', description: 'CLASSE “B”'},
    {code: 'C', description: 'CLASSE “C”'},
    {code: 'D', description: 'CLASSE “D”'}
  ]

  equipment = new Equipment();

  constructor(
    private equipmentService: EquipmentService,
    private areaService: AreaService,
    private pressureIndicatorService: PressureIndicatorService,
    private pressureSafetyValveService: PressureSafetyValveService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    public confirmation: ConfirmationService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Equipamento');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle('Atualização de Equipamento');
      this.loadPressureIndicatorList();
      this.loadPressureSafetyValveList();
      this.loadTestsList();
      this.loadEquipment(id);
    }
  }

  get updating(): boolean {
    return Boolean(this.equipment.id);
  }

  get uploadHeaders() {
    return this.equipmentService.uploadHeaders();
  }

  get urlUploadDatabook(): string {
    return `${this.equipmentService.baseUrl}/${this.equipment.id}/data-book`;
  }

  get urlUploadSafetyJournal(): string {
    return `${this.equipmentService.baseUrl}/${this.equipment.id}/safety-journal`;
  }

  get urlUploadInstallationProject(): string {
    return `${this.equipmentService.baseUrl}/${this.equipment.id}/installation-project`;
  }

  loadEquipment(id: number) {
    this.equipmentService.findById(id).subscribe({
      next: (res) => {
        this.equipment = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  loadAreaList(event: string) {
    this.areaService.findTopAreas(event).subscribe({
      next: res => {
        this.areas = res;
      }
    });
  }

  loadPressureIndicatorList() {
    this.pressureIndicatorService.findAvailable().subscribe({
      next: (res) => {
        this.availablePressureIndicators = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  loadPressureSafetyValveList() {
    this.pressureSafetyValveService.findAvailable().subscribe({
      next: (res) => {
        this.availablePressureSafetyValves = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  loadTestsList() {
    this.equipmentService.findTests().subscribe({
      next: (res) => {
        this.tests = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  setPressureIndicatorToBind(event: number) {
    for (let pi of this.availablePressureIndicators) {
      if (pi.id === event) {
        this.pressureIndicatorToBind = pi;
        return;
      }
    }
  }

  setPressureSafetyValveToBind(event: number) {
    for (let pi of this.availablePressureSafetyValves) {
      if (pi.id === event) {
        this.pressureSafetyValveToBind = pi;
        return;
      }
    }
  }

  onSelectTestToApply(event: number) {
    for (let test of this.tests) {
      if (test.id === event) {
        this.applicableTestToAdd.test = test;
        this.applicableTestToAdd.frequency = test.frequency;
        this.applicableTestToAdd.frequencyType = test.frequencyType;
        return;
      }
    }
  }

  save(form: NgForm) {
    if (this.equipment.id) {
      this.update(this.equipment.id, form);
    } else {
      this.create(form);
    }
  }

  private create(form: NgForm) {
    this.equipmentService.create(this.equipment).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Equipamento ${res.tag} cadastrado com Id=${res.id}`});
        this.router.navigate([`/equipments/${res.id}`])
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.equipmentService.update(id, this.equipment).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Equipamento atualizado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newEquipment(form: NgForm) {
    form.reset();
    this.equipment = new Equipment();
    this.router.navigate(['/equipments/create']);
  }

  afterUpload() {
    this.messageService.add({severity: 'success', detail: 'Arquivo anexado com sucesso'});
    this.loadEquipment(this.equipment.id || 0);
  }

  downloadDatabook() {
    this.equipmentService.downloadDatabook(this.equipment.id).subscribe({
      next: (res) => {
        let url = window.URL.createObjectURL(res);
        let a = document.createElement('a');
        a.href = url;
        a.download = `prontuario_${this.equipment.id}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  deleteDatabook() {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir o documento?\nAo confirmar, não será possível recuperar o arquivo.',
      accept: () => {
        this.equipmentService.deleteDatabook(this.equipment.id).subscribe({
          next: res => {
            this.messageService.add({severity: 'success', detail: 'Prontuário excluído com sucesso'});
            this.loadEquipment(this.equipment.id);
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

  downloadInstallationProject() {
    this.equipmentService.downloadInstallationProject(this.equipment.id).subscribe({
      next: (res) => {
        let url = window.URL.createObjectURL(res);
        let a = document.createElement('a');
        a.href = url;
        a.download = `projeto_instalacao${this.equipment.id}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  deleteInstallationProject() {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir o documento?\nAo confirmar, não será possível recuperar o arquivo.',
      accept: () => {
        this.equipmentService.deleteInstallationProject(this.equipment.id).subscribe({
          next: res => {
            this.messageService.add({severity: 'success', detail: 'Projeto de instalação excluído com sucesso'});
            this.loadEquipment(this.equipment.id);
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

  downloadSafetyJournal() {
    this.equipmentService.downloadSafetyJournal(this.equipment.id).subscribe({
      next: (res) => {
        let url = window.URL.createObjectURL(res);
        let a = document.createElement('a');
        a.href = url;
        a.download = `registro_seguranca${this.equipment.id}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  deleteSafetyJournal() {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir o documento?\nAo confirmar, não será possível recuperar o arquivo.',
      accept: () => {
        this.equipmentService.deleteSafetyJournal(this.equipment.id).subscribe({
          next: res => {
            this.messageService.add({severity: 'success', detail: 'Registro de segurança excluído com sucesso'});
            this.loadEquipment(this.equipment.id);
          },
          error: err => {
            this.errorHandler.handle(err);
          }
        });
      }
    });
  }

  onBindPressureIndicator() {
    this.equipmentService.bindPressureIndicator(this.equipment.id || 0, this.pressureIndicatorToBind.id || 0).subscribe({
      next: (res) => {
        this.loadPressureIndicatorList();
        this.loadEquipment(this.equipment.id || 0);
        this.messageService.add({severity: 'success', detail: 'Dispositivo vinculado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
    this.pressureIndicatorDialogVisible = false;
  }

  onBindPressureSafetyValve() {
    this.equipmentService.bindPressureSafetyValve(this.equipment.id || 0, this.pressureSafetyValveToBind.id || 0).subscribe({
      next: (res) => {
        this.loadPressureSafetyValveList();
        this.loadEquipment(this.equipment.id || 0);
        this.messageService.add({severity: 'success', detail: 'Dispositivo vinculado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
    this.pressureSafetyValveDialogVisible = false;
  }

  onUnbindPressureIndicator(id: number) {
    this.equipmentService.unbindPressureIndicator(this.equipment.id || 0, id).subscribe({
      next: (res) => {
        this.loadPressureIndicatorList();
        this.loadEquipment(this.equipment.id || 0);
        this.messageService.add({severity: 'success', detail: 'Dispositivo desvinculado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
    this.pressureIndicatorDialogVisible = false;
  }

  onUnbindPressureSafetyValve(id: number) {
    this.equipmentService.unbindPressureSafetyValve(this.equipment.id || 0, id).subscribe({
      next: (res) => {
        this.loadPressureSafetyValveList();
        this.loadEquipment(this.equipment.id || 0);
        this.messageService.add({severity: 'success', detail: 'Dispositivo desvinculado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
    this.pressureSafetyValveDialogVisible = false;
  }

  onAddApplicableTest() {
    this.equipmentService.addApplicableTest(this.equipment.id || 0, this.applicableTestToAdd).subscribe({
      next: (res) => {
        this.applicableTestToAdd = new ApplicableTest();
        this.loadEquipment(this.equipment.id || 0);
        this.messageService.add({severity: 'success', detail: 'Teste adicionado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
    this.applicableTestDialogVisible = false;
  }

  frequencyToText(frequency: number, frequencyType: 'DAY' | 'MONTH' | 'YEAR' | null): string {
    var dayText = frequency > 1 ? 'dias' : 'dia';
    var monthText = frequency > 1 ? 'meses' : 'mês';
    var yearText = frequency > 1 ? 'anos' : 'ano';
    return `${frequency} ${frequencyType === 'YEAR' ? yearText : frequencyType === 'MONTH' ? monthText : dayText}`;
  }

  activateApplicableTest(testId: number) {
    this.equipmentService.activateApplicableTest(this.equipment.id || 0, testId).subscribe({
      next: (res) => {
        this.loadEquipment(this.equipment.id || 0);
        this.messageService.add({severity: 'success', detail: 'Teste ativado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  inactivateApplicableTest(testId: number) {
    this.equipmentService.inactivateApplicableTest(this.equipment.id || 0, testId).subscribe({
      next: (res) => {
        this.loadEquipment(this.equipment.id || 0);
        this.messageService.add({severity: 'success', detail: 'Teste inativado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  onOpenApplicableTestDialog(testId: number) {
    for (let at of this.equipment.applicableTests) {
      if (at.testId === testId) {
        this.applicableTestToAdd.test.id = at.testId;
        this.applicableTestToAdd.frequency = at.frequency;
        this.applicableTestToAdd.frequencyType = at.frequencyType;
      }
    }
    this.applicableTestDialogVisible = true;
  }

}