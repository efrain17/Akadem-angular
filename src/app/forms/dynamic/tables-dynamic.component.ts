import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../forms.service'
import { tableData } from './tables-dynamic.data';
import { Persona, AtributosPersonas } from '../../common/interfaces';
import { MessengerDemo } from '../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
declare var jQuery: any;

@Component({
  selector: '[tables-dynamic]',
  templateUrl: './tables-dynamic.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './tables-dynamic.style.scss',
    '../notifications.style.scss',
    './elements.style.scss'
  ], 
  providers: [MessengerDemo]
})
export class TablesDynamic {
  data: any[];
  selectedTlf;
  persona_id: string;
  addTelefono: boolean = false;
  numberTlf: string = '';
  propietarioTlf: string = '';
  operadorTlf: any = [];
  dataAtributos: AtributosPersonas;
  injector: Injector;
  domSharedStylesHost: any;
  select2Options: any = {
    theme: 'bootstrap'
  };
  colorOptions: Object = {color: '#f0b518'};
  persona: Persona = {
    id_persona: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    provincia:'',
    ciudad: '', 
    fecha_nacimiento: '',
    telefono: [],
    operacion: ''
  };
  dateMask = {
    mask: [/\d/, /\d/,
      '/', /\d/, /\d/,
      '/', /[1-9]/, /\d/, /\d/, /\d/]
  };

  constructor(
    injector: Injector,
    private formService: FormsService,
    private messengerDemo: MessengerDemo 
  ) {
    this.domSharedStylesHost = injector.get(__platform_browser_private__.DomSharedStylesHost);
    this.domSharedStylesHost.__onStylesAdded__ = this.domSharedStylesHost.onStylesAdded;
    this.domSharedStylesHost.onStylesAdded = (additions) => {
      const style = additions[0];
      if (!style || !style.trim().startsWith('.select2-container')) {
        this.domSharedStylesHost.__onStylesAdded__(additions);
      }
    };
    this.formService.getPersonas()
      .then(data => this.data = data); 
  }

  cargarDatos(datos:any):void {
    this.persona_id = datos.id_persona;
    console.log(datos);
    this.persona = datos;
    this.getAtributosPersonas();
  }

  ngOnInit(): void {
    let searchInput = jQuery('#table-search-input, #search-countries');
    let theme = 'air';
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
    jQuery('#popover1, #popover2').popover();
    jQuery('#markdown-editor').markdown();
    jQuery('.js-slider').slider();
    jQuery('#colorpicker').colorpicker(this.colorOptions);
    jQuery('.selectpicker').selectpicker();
  }

  unmask(event) {
    return event.replace(/\D+/g, '');
  }

  updatePersona() :void {
    this.formService.updatePersona(this.persona_id, this.persona)
      .then(data=>  this.messengerDemo.mensajeSucessFull())
      .catch(err => this.messengerDemo.mensajeError())
  }

  mensaje(): void {
    this.messengerDemo.mensajeSucessFull()
  }

  select2Changed(e: any): void {
    this.selectedTlf = e.value;
  }

  getTipoTelefono(): void {
    return this.operadorTlf;
  }

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  getAtributosPersonas(): void {
    this.formService.getAtributoPersonas()
      .then(data => {
        this.dataAtributos = data;
        this.selectedTlf = data.operadores_telefonicos[0].descripcion;
        console.log(this.selectedTlf);
        this.operadorTlf = []
        data.operadores_telefonicos.map(date =>
          this.operadorTlf.push(date.descripcion)
        );
      });
  }
  
  agregarTelefono(): void {
    let idTelefono: any = this.dataAtributos.operadores_telefonicos;
    idTelefono = idTelefono.find(date =>date.descripcion == this.selectedTlf);
    let objTelefono = {'numero':this.numberTlf, 'propietario': this.propietarioTlf, 'id_telefono': idTelefono.id, 'operacion': 'insert'};
    this.persona.telefono.push(objTelefono);
    this.addTelefono = false;
    console.log(this.persona.telefono);
  }

  eliminarTelefono(telefono): void {
    this.persona.telefono = this.persona.telefono.map(date =>{
      if(date == telefono) date.operacion = 'delete';
      return date;
    });
  }

}
