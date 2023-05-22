import { Component, OnInit } from '@angular/core';
import { PendencyCreationRequest } from 'src/app/core/model/pendency';
import { PendencyService } from '../pendency.service';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-pendency-form',
  templateUrl: './pendency-form.component.html',
  styleUrls: ['./pendency-form.component.scss']
})
export class PendencyFormComponent implements OnInit {

  pendency = new PendencyCreationRequest();
  pendencyTypeOptions: any[] = [
    {label: 'Obrigatória', value: 'MANDATORY'},
    {label: 'Recomendada', value: 'RECOMMENDATION'},
    {label: 'Opcional', value: 'OPTIONAL'}
  ];
  pendencyStatusOptions: any[] = [
    {label: 'Aberto', value: 'STARTED'},
    {label: 'Concluído', value: 'COMPLETED'},
    {label: 'Cancelado', value: 'CANCELED'}
  ];

  pendencyResponsibleOptions: any [] = [];

  constructor(
    private pendencyService: PendencyService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Atualização de Pendência');
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.pendencyService.findById(id).subscribe({
        next: (res) => {
          this.pendency = res;
          this.pendency.deadLine = new Date(this.pendency.deadLine);
        },
        error: (err) => {
          this.errorHandler.handle(err);
        }
      });
    }
  }


  save(form: NgForm) {
    this.pendencyService.update(this.pendency.id || 0, this.pendency).subscribe({
      next: (res) => {
        this.messageService.add({severity: 'success', detail: 'Pendência atualizada com sucesso'});
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  updateResponsibleList(event: string) {
    this.userService.findTop10ByName(event).subscribe({
      next: res => {
        this.pendencyResponsibleOptions = res;
      }
    });
  }

}
