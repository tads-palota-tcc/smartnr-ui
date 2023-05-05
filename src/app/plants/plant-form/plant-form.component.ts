import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plant } from 'src/app/core/model/plant';
import { BRAZILIAN_STATES } from 'src/app/shared/utils/states';
import { PlantService } from '../plant.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent implements OnInit {

  states = BRAZILIAN_STATES;

  plant = new Plant();

  constructor(
    private plantService: PlantService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
  }

  save(form: NgForm) {
    this.plantService.create(this.plant).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Planta ${res.code} cadastrada com Id=${res.id}`});
        form.reset();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    })
  }
}
