import { Component, OnInit } from '@angular/core';
import { PressureIndicator } from 'src/app/core/model/pressure-indicator';
import { PressureIndicatorService } from '../pressure-indicator.service';
import { PlantService } from 'src/app/features/plants/plant.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CalibrationSummary } from 'src/app/core/model/calibration';

@Component({
  selector: 'app-pressure-indicator-form',
  templateUrl: './pressure-indicator-form.component.html',
  styleUrls: ['./pressure-indicator-form.component.scss']
})
export class PressureIndicatorFormComponent implements OnInit {

  plants: any[] = []

  pressureIndicator = new PressureIndicator();

  calibrations: CalibrationSummary[] = []

  constructor(
    private pressureIndicatorService: PressureIndicatorService,
    private plantService: PlantService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Indicador de Pressão');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle('Atualização de Indicador de Pressão');
      this.loadPressureIndicator(id);
      this.loadCalibrations(id);
    }
  }

  private loadPressureIndicator(id: number) {
    this.pressureIndicatorService.findById(id).subscribe({
      next: (res) => {
        this.pressureIndicator = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private loadCalibrations(id: number) {
    this.pressureIndicatorService.findCalibrations(id).subscribe({
      next: (res) => {
        this.calibrations = res;
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  get updating(): boolean {
    return Boolean(this.pressureIndicator.id);
  }

  updateList(event: string) {
    this.plantService.findTopPlants(event).subscribe({
      next: res => {
        this.plants = res;
      }
    });
  }

  save(form: NgForm) {
    if (this.pressureIndicator.id) {
      this.update(this.pressureIndicator.id, form);
    } else {
      this.create(form);
    }
  }

  private create(form: NgForm) {
    this.pressureIndicatorService.create(this.pressureIndicator).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Indicador de Pressão ${res.tag} cadastrado com Id=${res.id}`});
        this.router.navigate([`/pressure-indicators/${res.id}`])
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.pressureIndicatorService.update(id, this.pressureIndicator).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Indicador de Pressão atualizado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newPressureIndicator(form: NgForm) {
    form.reset();
    this.pressureIndicator = new PressureIndicator();
    this.router.navigate(['/pressure-indicators/create']);
  }
}
