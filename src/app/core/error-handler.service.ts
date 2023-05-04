import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else {
      message = errorResponse.error.userMessage || 'Erro ao processar serviço remonto. Tente novamente mais tarde.';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.messageService.add({severity: 'error', detail: message})
  }
}
