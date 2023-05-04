import { Component } from '@angular/core';
import { PlantService } from 'src/app/plants/plant.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent {
  
  ativo = true;

  plantaSelecionada!: number;

  constructor(private plantService: PlantService) { }

  plants: any[] = []

  atualizaLista(event: string) {
    this.plantService.findTopPlants(event).subscribe({
      next: res => {
        this.plants = res;
      }
    })
  }
}
