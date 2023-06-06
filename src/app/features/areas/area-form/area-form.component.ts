import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Area } from 'src/app/core/model/area';
import { PlantService } from 'src/app/features/plants/plant.service';
import { AreaService } from '../area.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {

  plants: any[] = []

  area = new Area();

  constructor(
    private areaService: AreaService,
    private plantService: PlantService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Área');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle('Atualização de Área')
      this.areaService.findById(id).subscribe({
        next: (res) => {
          this.area = res;
        },
        error: (err) => {
          this.errorHandler.handle(err);
        }
      });
    }
  }

  get updating(): boolean {
    return Boolean(this.area.id);
  }

  updateList(event: string) {
    this.plantService.findTopPlants(event).subscribe({
      next: res => {
        this.plants = res;
      }
    });
  }

  save(form: NgForm) {
    if (this.area.id) {
      this.update(this.area.id, form);
    } else {
      this.create(form);
    }
  }

  private create(form: NgForm) {
    this.areaService.create(this.area).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Área ${res.code} cadastrada com Id=${res.id}`});
        this.router.navigate([`/areas/${res.id}`])
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.areaService.update(id, this.area).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Área atualizada com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newArea(form: NgForm) {
    form.reset();
    this.area = new Area();
    this.router.navigate(['/areas/create']);
  }

}
