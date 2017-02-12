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
    '../scss/tables-dynamic.style.scss',
    '../scss/notifications.style.scss',
    '../scss/elements.style.scss'
  ],
  providers: [MessengerDemo]
})
export class TablesDynamic {
  data: any[];
  selectedTlf;
  selectedRolUser;
  selectedDiscapacidad;
  personaId: string;
  addTelefono: boolean = false;
  addRolUsuario: boolean = false;
  addDiscapacidad: boolean = false;
  numberTlf: string = '';
  porcentajeDiscapacidad: string = '';
  propietarioTlf: string = '';
  operadorTlf: any = [];
  rolesUsuarios: any = [];
  discapacidades: any = []
  rolesUsuariosOld: any = [];
  discapacidadesOld: any = [];
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
      .then(data => this.data = data)
      .catch(err => this.messengerDemo.mensajeError());
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
    console.log(this.persona)
    /* this.formService.updatePersona(this.personaId, this.persona)
      .then(data =>  this.messengerDemo.mensajeSucessFull())
      .catch(err => this.messengerDemo.mensajeError()); */
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

  selectDiscapacidadChanged(e: any): void {
    this.selectedDiscapacidad = e.value;
  }

  getTipoTelefono(): void {
    return this.operadorTlf;
  }

  getTipoRolUsuario(): void {
    return this.rolesUsuarios;
  }

  getTipoDiscapacidad(): void {
    return this.discapacidades;
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
        data.discapacidades.map(date => this.discapacidades.push(date.descripcion));
        this.rolesUsuariosOld = this.rolesUsuarios;
        this.discapacidadesOld = this.discapacidades;
        this.filtrarRolesRepetidos();
        this.filtrarDiscapacidadesRepetidos();
      });
  }

  agregarTelefono(): void {
    if (this.numberTlf && this.propietarioTlf) {
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
  }

  agregarRolUsuario(): void {
    if (this.selectedRolUser) {
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

  agregarDiscapacidad(): void {
    if (this.selectedDiscapacidad && this.porcentajeDiscapacidad) {
      let idDiscapacidad: any = this.dataAtributos.discapacidades;
      idDiscapacidad = idDiscapacidad.find(date => date.descripcion === this.selectedDiscapacidad);
      let objDiscapacidad = {
        'descripcion': idDiscapacidad.descripcion,
        'id_discapacidad': idDiscapacidad.id_discapacidad,
        'operacion': 'insert',
        'porcentaje': this.porcentajeDiscapacidad
      };
      this.persona.discapacidad.push(objDiscapacidad);
      this.addDiscapacidad = false;
      this.filtrarDiscapacidadesRepetidos();
    }
  }

  eliminarParametro(parametrosArray, parametroDelete): void {
    parametrosArray = parametrosArray.map(date => {
      if (date === parametroDelete && date.operacion === 'insert') date.operacion = 'deleteLocal';
      else if (date === parametroDelete) date.operacion = 'delete';
      return date;
    });
    parametrosArray = parametrosArray.filter(date => date.operacion !== 'deleteLocal');
    console.log(parametrosArray);
    return parametrosArray;
  }

  eliminarTelefono(telefono): void {
    this.persona.telefono = this.eliminarParametro(this.persona.telefono, telefono);
  }

  eliminarRolUser(rolUser): void {
    this.persona.tipo_usuario = this.eliminarParametro(this.persona.tipo_usuario, rolUser);
    this.filtrarRolesRepetidos();
  }

  eliminarDiscapacidad(discapcidadUser): void {
    this.persona.discapacidad =  this.eliminarParametro(this.persona.discapacidad, discapcidadUser);
    this.filtrarRolesRepetidos();
  }

  filtrarParametros(parametrosArray, parametrosArrayFilter): void {
    return parametrosArray.filter(dataFilter => {
      let dataReturn =parametrosArrayFilter.find(data => data.descripcion === dataFilter);
      if (!dataReturn) return dataFilter;
    });
  }

  filtrarRolesRepetidos(): void {
    this.rolesUsuarios = this.filtrarParametros(this.rolesUsuariosOld, this.persona.tipo_usuario);
    this.selectedRolUser = this.rolesUsuarios[0];
  }

  filtrarDiscapacidadesRepetidos(): void {
    this.discapacidades = this.filtrarParametros(this.discapacidadesOld, this.persona.discapacidad);
    this.selectedDiscapacidad = this.discapacidades[0];
    this.porcentajeDiscapacidad = '';
  }

  newUpdate(): void {
    this.addTelefono = false;
    this.propietarioTlf = '';
    this.numberTlf = '';
  }

}
