import { Component } from '@angular/core';

@Component({
  selector: 'app-plant-search',
  templateUrl: './plant-search.component.html',
  styleUrls: ['./plant-search.component.scss']
})
export class PlantSearchComponent {
  plants = [
    {
      id: 1,
      code: "RGD1",
      name: "Unidade Rio Grande 1",
      active: true
    },
    {
      id: 2,
      code: "RGD2",
      name: "Unidade Rio Grande 2",
      active: true
    },
    {
      id: 3,
      code: "RGD3",
      name: "Unidade Rio Grande 3",
      active: true
    },
    {
      id: 4,
      code: "RGD4",
      name: "Unidade Rio Grande 4",
      active: true
    },
    {
      id: 5,
      code: "RGD5",
      name: "Unidade Rio Grande 5",
      active: true
    },
    {
      id: 11,
      code: "POA1",
      name: "Unidade Porto Alegre 1",
      active: true
    },
    {
      id: 12,
      code: "POA2",
      name: "Unidade Porto Alegre 2",
      active: true
    },
    {
      id: 13,
      code: "POA3",
      name: "Unidade Porto Alegre 3",
      active: true
    },
    {
      id: 14,
      code: "POA4",
      name: "Unidade Porto Alegre 4",
      active: true
    },
    {
      id: 15,
      code: "POA5",
      name: "Unidade Porto Alegre 5",
      active: true
    }
  ]
}
