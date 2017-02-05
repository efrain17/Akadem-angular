import { Component, ViewEncapsulation } from '@angular/core';
import { MessengerDemos } from './messenger/messenger.directive'
@Component({
  selector: '[ui-components]',
  templateUrl: './notifications.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notifications.style.scss'],
  providers:[MessengerDemos]
})
export class Notifications {

  constructor (private messengerDemo: MessengerDemos) {

  }

  mensaje(): void {
    this.messengerDemo.mensajeSucessFull();
  }
}

