import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Area } from 'src/app/core/model/area';
import { PlantService } from 'src/app/plants/plant.service';
import { AreaService } from '../area.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {
  
  plants: any[] = []

  teste!: any;

  area = new Area();

  constructor(
    private areaService: AreaService,
    private plantService: PlantService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
  }

  atualizaLista(event: string) {
    this.plantService.findTopPlants(event).subscribe({
      next: res => {
        this.plants = res;
      }
    })
  }

  save(form: NgForm) {
    this.areaService.create(this.area).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Área ${res.code} cadastrada com Id=${res.id}`});
        form.reset();
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }
}
