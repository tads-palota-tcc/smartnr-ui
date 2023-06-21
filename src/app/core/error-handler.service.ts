import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService, private router: Router) { }

  handle(errorResponse: any) {
    console.log(typeof errorResponse)
    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status === 403) {
      message = errorResponse.error.userMessage
      this.messageService.add({severity: 'error', detail: message});
      this.router.navigate(['dashboard']);
    } else {
      message = errorResponse.error.userMessage || 'Erro ao processar serviço remonto. Tente novamente mais tarde.';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.messageService.add({severity: 'error', detail: message})
  }
}
