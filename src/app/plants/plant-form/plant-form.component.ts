import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plant } from 'src/app/core/model/plant';
import { BRAZILIAN_STATES } from 'src/app/shared/utils/states';
import { PlantService } from '../plant.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/security/auth.service';

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
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Planta');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.title.setTitle('Atualização de Planta');
      this.plantService.findById(id).subscribe({
        next: (res) => {
          this.plant = res;
        },
        error: (err) => {
          this.errorHandler.handle(err);
        }
      })
    }
  }

  get updating(): boolean {
    return Boolean(this.plant.id);
  }

  save(form: NgForm) {
    if (this.plant.id) {
      this.update(this.plant.id, form);
    } else {
      this.create(form);
    }
  }

  private create(form: NgForm) {
    this.plantService.create(this.plant).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: `Planta ${res.code} cadastrada com Id=${res.id}`});
        // form.reset();
        this.router.navigate([`/plants/${res.id}`]);
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private update(id: number, form: NgForm) {
    this.plantService.update(id, this.plant).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Planta atualizada com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  newPlant(form: NgForm) {
    form.reset();
    this.plant = new Plant();
    this.router.navigate(['/plants/create']);
  }
}
