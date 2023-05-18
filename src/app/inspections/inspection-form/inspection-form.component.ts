import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Test } from 'src/app/core/model/applicable-tests';
import { Inspection } from 'src/app/core/model/Inspection';
import { Plant } from 'src/app/core/model/plant';
import { EquipmentService } from 'src/app/equipments/equipment.service';
import { PlantService } from 'src/app/plants/plant.service';
import { AuthService } from 'src/app/security/auth.service';

import { InspectionService } from '../inspection.service';

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

  constructor(
    public inspectionService: InspectionService,
    public plantService: PlantService,
    public equipmentService: EquipmentService,
    public auth: AuthService,
    public messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
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

}
