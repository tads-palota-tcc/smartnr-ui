import { Component, OnInit } from '@angular/core';
import { Calibration } from 'src/app/core/model/calibration';
import { CalibrationService } from '../calibration.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { PlantService } from 'src/app/plants/plant.service';
import { Plant } from 'src/app/core/model/plant';
import { DeviceService } from 'src/app/devices/device.service';

@Component({
  selector: 'app-calibration-form',
  templateUrl: './calibration-form.component.html',
  styleUrls: ['./calibration-form.component.scss']
})
export class CalibrationFormComponent implements OnInit {

  plants: any[] = [];
  devices: any[] = [];
  statusOptions: any[] = [{label: 'Aguardando relatório', value: 'WAITING_REPORT'}, {label: 'Concluído', value: 'DONE'}];
  
  selectedPlant?: Plant;

  calibration = new Calibration();

  constructor(
    private calibrationService: CalibrationService,
    private plantService: PlantService,
    private deviceService: DeviceService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Calibração');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle('Atualização de Calibração')
      this.calibrationService.findById(id).subscribe({
        next: (res) => {
          this.calibration = res;
          this.selectedPlant = res.device.plant
        },
        error: (err) => {
          this.errorHandler.handle(err);
        }
      });
    }
  }

  get updating(): boolean {
    return Boolean(this.calibration.id);
  }

  get urlUploadReport(): string {
    return `${this.calibrationService.baseUrl}/${this.calibration.id}/reports`;
  }

  get uploadHeaders() {
    return this.calibrationService.uploadHeaders();
  }

  updatePlantList(event: string) {
    this.plantService.findTopPlants(event).subscribe({
      next: res => {
        this.plants = res;
      }
    });
  }

  updateDeviceList(tag: string) {
    console.log(this.selectedPlant?.code);
    console.log(tag);
    this.deviceService.findByPlantCodeAndTag(this.selectedPlant?.code || '', tag).subscribe({
      next: res => {
        this.devices = res;
      }
    });
  }

  save(form: NgForm) {
    if (this.calibration.id) {
      this.update(this.calibration.id, form);
    } else {
      this.create(form.value);
    }
  }

  private create(form: NgForm) {
    this.calibrationService.create(this.calibration).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Calibração cadastrada com Id=${res.id}`});
        this.router.navigate([`/calibrations/${res.id}`])
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.calibrationService.update(id, this.calibration).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Calibração atualizada com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newCalibration(form: NgForm) {
    form.reset();
    this.calibration = new Calibration();
    this.router.navigate(['/calibrations/create']);
  }

  showUploadConfirmation() {
    this.messageService.add({severity: 'success', detail: 'Arquivo anexado com sucesso'});
  }

}
