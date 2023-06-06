import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CalibrationSummary } from 'src/app/core/model/calibration';
import { PressureSafetyValve } from 'src/app/core/model/pressure-safety-valve';
import { PlantService } from 'src/app/features/plants/plant.service';
import { AuthService } from 'src/app/security/auth.service';
import { PressureSafetyValveService } from '../pressure-safety-valve.service';

@Component({
  selector: 'app-pressure-safety-valve-form',
  templateUrl: './pressure-safety-valve-form.component.html',
  styleUrls: ['./pressure-safety-valve-form.component.scss']
})
export class PressureSafetyValveFormComponent implements OnInit {

  plants: any[] = []

  pressureSafetyValve = new PressureSafetyValve();

  calibrations: CalibrationSummary[] = []

  constructor(
    private pressureSafetyValveService: PressureSafetyValveService,
    private plantService: PlantService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Válvula de Segurança');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle('Atualização de Válvula de Segurança');
      this.loadPressureSafetyValve(id);
      this.loadCalibrations(id);
    }
  }

  private loadPressureSafetyValve(id: number) {
    this.pressureSafetyValveService.findById(id).subscribe({
      next: (res) => {
        this.pressureSafetyValve = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private loadCalibrations(id: number) {
    this.pressureSafetyValveService.findCalibrations(id).subscribe({
      next: (res) => {
        this.calibrations = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  get updating(): boolean {
    return Boolean(this.pressureSafetyValve.id);
  }

  updateList(event: string) {
    this.plantService.findTopPlants(event).subscribe({
      next: res => {
        this.plants = res;
      }
    });
  }

  save(form: NgForm) {
    if (this.pressureSafetyValve.id) {
      this.update(this.pressureSafetyValve.id, form);
    } else {
      this.create(form);
    }
  }

  private create(form: NgForm) {
    this.pressureSafetyValveService.create(this.pressureSafetyValve).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Válvula de Segurança ${res.tag} cadastrado com Id=${res.id}`});
        this.router.navigate([`/pressure-safety-valves/${res.id}`])
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.pressureSafetyValveService.update(id, this.pressureSafetyValve).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Válvula de Segurança atualizada com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newPressureSafetyValve(form: NgForm) {
    form.reset();
    this.pressureSafetyValve = new PressureSafetyValve();
    this.router.navigate(['/pressure-safety-valves/create']);
  }

}
