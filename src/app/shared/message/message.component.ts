import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="hasError()" class="p-message p-message-error">{{ text }}</div>
  `,
  styles: [`
  .p-message-error {
    margin: 0;
    margin-top: 4px;
    padding: 3px;
  }
`]
})
export class MessageComponent {

  @Input() control!: FormControl;
  @Input() error: string = '';
  @Input() text: string = '';

  hasError(): boolean {
    return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
  }

}
