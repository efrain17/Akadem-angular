import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var global: any;
// libs
/* tslint:disable */
var markdown = require('markdown').markdown;
/* tslint:enable */
global.markdown = markdown;

import 'messenger/build/js/messenger.js';
import 'jquery-ui/ui/sortable.js';
import 'jquery.nestable/jquery.nestable.js';
import 'bootstrap-markdown/js/bootstrap-markdown.js';
import 'bootstrap-select/dist/js/bootstrap-select.js';
import 'parsleyjs';
import 'bootstrap-application-wizard/src/bootstrap-wizard.js';
import 'twitter-bootstrap-wizard/jquery.bootstrap.wizard.js';
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js';
import 'jasny-bootstrap/js/fileinput.js';
import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js';
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js';
import 'bootstrap-colorpicker';
import 'bootstrap-slider/dist/bootstrap-slider.js';
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js';
import 'jasny-bootstrap/js/fileinput.js';
import 'jasny-bootstrap/js/inputmask.js';

import { TooltipModule, AlertModule, DropdownModule } from 'ng2-bootstrap';
import { Autosize } from 'angular2-autosize';
import { Select2Module } from 'ng2-select2';
import { WidgetModule } from '../layout/widget/widget.module';
import { TextMaskModule } from 'angular2-text-mask';
//tablem-module
import { ButtonsModule, PaginationModule  } from 'ng2-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table';
import { UtilsModule } from '../layout/utils/utils.module';
import { JqSparklineModule } from '../components/sparkline/sparkline.module'; 
import { TabsModule, AccordionModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

/* tslint:disable */
import { BootstrapWizardModule } from '../components/wizard/wizard.module';
import { BootstrapApplicationWizard } from './wizard/bootstrap-application-wizard/bootstrap-application-wizard.directive';
import { DropzoneDemo } from '../components/dropzone/dropzone.directive';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
/* tslint:enable */

import { Components } from './components/components.component';
import { Buttons } from './buttons/buttons.component';
import { Notifications } from './notifications/notifications.component';
import { Icons } from './icons/icons.component';
import { TabsAccordion } from './tabs-accordion/tabs-accordion.component';
import { ListGroups } from './list-groups/list-groups.component';

import { MessengerDemos } from './notifications/messenger/messenger.directive';

export const routes = [
  {path: '', redirectTo: 'components', pathMatch: 'full'},
  {path: 'components', component: Components},
  {path: 'buttons', component: Buttons},
  {path: 'notifications', component: Notifications},
  {path: 'icons', component: Icons},
  {path: 'tabs-accordion', component: TabsAccordion},
  {path: 'list-groups', component: ListGroups},
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Components,
    Buttons,
    Notifications,
    MessengerDemos,
    Icons,
    TabsAccordion,
    ListGroups
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AlertModule.forRoot(),
    WidgetModule,
    TooltipModule.forRoot(),
    ModalModule,
    ButtonsModule.forRoot(),
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    JqSparklineModule,
    TextMaskModule,
    PaginationModule.forRoot(),
    UtilsModule,
    Ng2TableModule,
    DataTableModule,
    BootstrapWizardModule,
    NKDatetimeModule,
    Select2Module
  ]
})
export class UiElementsModule {
  static routes = routes;
}
