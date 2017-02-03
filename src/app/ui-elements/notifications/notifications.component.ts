import { Component, ViewEncapsulation } from '@angular/core';
import { MessengerDemo } from './messenger/messenger.directive'
@Component({
  selector: '[ui-components]',
  templateUrl: './notifications.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notifications.style.scss'],
  providers:[MessengerDemo]
})
export class Notifications {

  constructor (private messengerDemo: MessengerDemo) {

  }

  mensaje(): void {
    this.messengerDemo.mensaje();
  }
}

