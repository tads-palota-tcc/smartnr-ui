import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/areas/area.service';
import { Equipment } from 'src/app/core/model/equipment';
import { EquipmentService } from '../equipment.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Area } from 'src/app/core/model/area';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.scss']
})
export class EquipmentFormComponent implements OnInit {

  areas: any[] = []
  
  fluidClasses: {code: string, description: string}[] = [
    {code: 'A', description: 'CLASSE “A”'},
    {code: 'B', description: 'CLASSE “B”'},
    {code: 'C', description: 'CLASSE “C”'},
    {code: 'D', description: 'CLASSE “D”'}
  ]

  equipment = new Equipment();

  constructor(
    private equipmentService: EquipmentService,
    private areaService: AreaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Equipamento');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle('Atualização de Equipamento')
      this.equipmentService.findById(id).subscribe({
        next: (res) => {
          this.equipment = res;
        },
        error: (err) => {
          this.errorHandler.handle(err);
        }
      });
    }
  }

  get updating(): boolean {
    return Boolean(this.equipment.id);
  }

  updateList(event: string) {
    this.areaService.findTopAreas(event).subscribe({
      next: res => {
        this.areas = res;
      }
    });
  }

  save(form: NgForm) {
    if (this.equipment.id) {
      this.update(this.equipment.id, form);
    } else {
      this.create(form);
    }
  }

  private create(form: NgForm) {
    this.equipmentService.create(this.equipment).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Equipamento ${res.tag} cadastrado com Id=${res.id}`});
        this.router.navigate([`/equipments/${res.id}`])
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.equipmentService.update(id, this.equipment).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Equipamento atualizado com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newEquipment(form: NgForm) {
    form.reset();
    this.equipment = new Equipment();
    this.router.navigate(['/equipments/create']);
  }

  onUploadDatabook(event: any) {

  }

  onUnbindPressureIndicator(id: number) {

  }

  onUnbindPressureSafetyValve(id: number) {
    
  }

}