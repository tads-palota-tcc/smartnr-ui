import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plant } from 'src/app/core/model/plant';
import { BRAZILIAN_STATES } from 'src/app/shared/utils/states';
import { PlantService } from '../plant.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent {

  states = BRAZILIAN_STATES;

  plant = new Plant();

  constructor(
    private plantService: PlantService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService) {}

  save(form: NgForm) {
    this.plantService.create(this.plant).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Planta cadastrada com sucesso'});
        form.reset();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
  }
}
