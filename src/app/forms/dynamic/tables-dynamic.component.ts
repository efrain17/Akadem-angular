import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../forms.service';
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
  selectedRolUser;
  personaId: string;
  addTelefono: boolean = false;
  addRolUsuario: boolean = false;
  numberTlf: string = '';
  propietarioTlf: string = '';
  operadorTlf: any = [];
  rolesUsuarios: any = [];
  rolesUsuariosOld: any = [];
  dataAtributos: AtributosPersonas;
  injector: Injector;
  domSharedStylesHost: any;
  select2Options: any =
  {
    theme: 'bootstrap'
  };
  colorOptions: Object = {color: '#f0b518'};
  persona: Persona = {
    id_persona: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    provincia: '',
    ciudad: '',
    fecha_nacimiento: '',
    telefono: [],
    tipo_usuario: [],
    discapacidad: [],
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

  cargarDatos(datos: any): void {
    this.personaId = datos.id_persona;
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

  updatePersona(): void {
    this.formService.updatePersona(this.personaId, this.persona)
      .then(data =>  this.messengerDemo.mensajeSucessFull())
      .catch(err => this.messengerDemo.mensajeError());
  }

  mensaje(): void {
    this.messengerDemo.mensajeSucessFull();
  }

  select2Changed(e: any): void {
    this.selectedTlf = e.value;
  }

  selectRolChanged(e: any): void {
    this.selectedRolUser = e.value;
  }

  getTipoTelefono(): void {
    return this.operadorTlf;
  }
  getTipoRolUsuario(): void {
    return this.rolesUsuarios;
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
        this.operadorTlf = [];
        this.rolesUsuarios =  [];
        data.operadores_telefonicos.map(date => this.operadorTlf.push(date.descripcion));
        data.tipos_usuarios.map(date => this.rolesUsuarios.push(date.descripcion));
        this.rolesUsuariosOld = this.rolesUsuarios;
        this.filtrarRolesRepetidos();
      });
  }

  agregarTelefono(): void {
    let idTelefono: any = this.dataAtributos.operadores_telefonicos;
    idTelefono = idTelefono.find(date => date.descripcion === this.selectedTlf);
    let objTelefono = {
      'numero': this.numberTlf,
      'propietario': this.propietarioTlf,
      'id_telefono': 'null',
      'operacion': 'insert',
      'id_operadora': idTelefono.id,
    };
    this.persona.telefono.push(objTelefono);
    this.addTelefono = false;
  }

  agregarRolUsuario(): void {
    if(this.selectedRolUser){
      let idRolUser: any = this.dataAtributos.tipos_usuarios;
      idRolUser = idRolUser.find(date => date.descripcion === this.selectedRolUser);
      let objRolUser = {
        'descripcion': idRolUser.descripcion,
        'id_tipo_usuario': idRolUser.id,
        'operacion': 'insert',
        'id': 'null'
      };
      this.persona.tipo_usuario.push(objRolUser);
      this.addRolUsuario = false;
      this.filtrarRolesRepetidos();
    }
  }

  eliminarTelefono(telefono): void {
    this.persona.telefono = this.persona.telefono.map(date => {
      if (date === telefono && date.operacion === 'insert') date.operacion = 'deleteLocal';
      else if (date === telefono) date.operacion = 'delete';
      return date;
    });
    this.persona.telefono = this.persona.telefono.filter(date =>
      date.operacion !== 'deleteLocal');
    console.log(this.persona.telefono);
  }

  eliminarRolUser(rolUser): void {
    this.persona.tipo_usuario = this.persona.tipo_usuario.map(date => {
      if (date === rolUser && date.operacion === 'insert') date.operacion = 'deleteLocal';
      else if (date === rolUser) date.operacion = 'delete';
      return date;
    });
    this.persona.tipo_usuario = this.persona.tipo_usuario.filter(date =>
      date.operacion !== 'deleteLocal');
    this.filtrarRolesRepetidos();
    console.log(this.persona.tipo_usuario);
  }

  filtrarRolesRepetidos(): void {
    this.rolesUsuarios = this.rolesUsuariosOld.filter(dataFilter => {
      let dataReturn = this.persona.tipo_usuario.find(data => data.descripcion === dataFilter);
      if (!dataReturn) return dataFilter;
    });
    this.selectedRolUser = this.rolesUsuarios[0];
  }

  newUpdate(): void {
    this.addTelefono = false;
    this.propietarioTlf = '';
    this.numberTlf = '';
  }

}
