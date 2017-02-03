import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { __platform_browser_private__ } from '@angular/platform-browser';
import * as data from './elements.data';
import { Persona } from '../../common/interfaces'
import { FormsService } from '../forms.service'
declare var jQuery: any;

@Component({
  selector: '[elements]',
  templateUrl: './elements.template.html',
  styleUrls: [ './elements.style.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class Elements {
  colorOptions: Object = {color: '#f0b518'};
  injector: Injector;
  domSharedStylesHost: any;
  dateMask = {
    mask: [/\d/, /\d/,
      '/', /\d/, /\d/,
      '/', /[1-9]/, /\d/, /\d/, /\d/]
  };
  persona: Persona = {
    id_persona: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    provincia:'',
    ciudad: '', 
    fecha_nacimiento: ''
  };

  constructor(
    injector: Injector,
    private formsService: FormsService
    ) {
    //
    // This is a hack on angular style loader to prevent ng2-select2 from adding its styles.
    // They are hard-coded into the component, so there are no other way to get rid of them
    //
    this.domSharedStylesHost = injector.get(__platform_browser_private__.DomSharedStylesHost);
    this.domSharedStylesHost.__onStylesAdded__ = this.domSharedStylesHost.onStylesAdded;
    this.domSharedStylesHost.onStylesAdded = (additions) => {
      const style = additions[0];
      if (!style || !style.trim().startsWith('.select2-container')) {
        this.domSharedStylesHost.__onStylesAdded__(additions);
      }
    };
    //for (var prop in this.persona) {
    //  this.persona[prop] = '1';
    //}
  }

  ngOnInit(): void {
    jQuery('#markdown-editor').markdown();
    jQuery('.js-slider').slider();
    jQuery('#colorpicker').colorpicker(this.colorOptions);
    jQuery('.selectpicker').selectpicker();
  }

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  unmask(event) {
    return event.replace(/\D+/g, '');
  }

  guardar(): void {
    this.formsService.guardarPersona(this.persona)
      /*.then(data=> {
        this.messengerDemo.mensajeSucessFull();
        this.nuevo();
      })
      .catch(err=> this.messengerDemo.mensajeError())*/
  }

  nuevo(): void {
    this.persona= {
      id_persona: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      provincia:'',
      ciudad: '', 
      fecha_nacimiento: ''
    };
  }

}
