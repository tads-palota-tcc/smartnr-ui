import { Component } from '@angular/core';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent {
  
  ativo = true;

  plantaSelecionada!: number;

  plantas = [
    {code: 'RGD1', id: 1, name: 'Rio Grande 1'},
    {code: 'RGD2', id: 2, name: 'Rio Grande 2'},
    {code: 'PEL1', id: 3, name: 'Pelotas 1'},
    {code: 'PEL2', id: 4, name: 'Pelotas 2'},
    {code: 'POA1', id: 5, name: 'Porto Alegre 1'},
    {code: 'POA2', id: 6, name: 'Porto Alegre 2'},
  ]
}
