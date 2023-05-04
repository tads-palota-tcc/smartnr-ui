import { Component } from '@angular/core';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent {

  ativo = false;
  estadoSelecionado = 'SC'

  code = 'A'

  estados = [
    {code: 'RS', name: 'Rio Grande do Sul'},
    {code: 'SC', name: 'Santa Catarina'},
    {code: 'PR', name: 'Paraná'}
  ]
}
