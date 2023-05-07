import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
  <div class="container">
    <h1>Acesso negado!</h1>
    <p>Você não tem permissão para acessar a funcionalidade que procurou. Caso precise, solicite o acesso a um administrador do sistema.</p>
  </div>
`,
  styles: [
  ]
})
export class AccessDeniedComponent {

}
