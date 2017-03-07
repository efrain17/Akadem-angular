import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../forms.service';
import { AtributosEstructuraClase } from '../../common/interfaces';
import { MessengerDemo } from '../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { deleteParametro, eliminarParametroObj, addParametro } from '../../common/funtions';
import { promiseMessage, cargarLista } from '../../common/funtions';
declare var jQuery: any;

@Component({
  selector: '[estructura-educativa]',
  templateUrl: './estructura-educativa.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../scss/tables-dynamic.style.scss',
    '../scss/notifications.style.scss',
    '../scss/elements.style.scss'
  ],
  providers: [MessengerDemo]
})
export class EstructuraEducativa {
  domSharedStylesHost: any;
  select2Options: any = {theme: 'bootstrap'};
  colorOptions: Object = {color: '#f0b518'};
  dateMask = {
    mask: [/\d/, /\d/,
      '/', /\d/, /\d/,
      '/', /[1-9]/, /\d/, /\d/, /\d/]
  };
  estructuraAcademica: AtributosEstructuraClase =
  {
    area_academica: [],
    grado: [],
    tipo_curso: [],
    paralelo: [],
    tipo_grado: [],
    periodo: []
  };
  periodo: any = {
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  };
  nombreAreaAcademica;
  nombreGrado;
  nombreTipoCurso;
  nombreParalelo;
  nombreTipoGrado;
  addAreaAcademica: boolean = false;
  addGrado: boolean = false;
  addTipoCurso: boolean = false;
  addTipoGrado: boolean = false;
  addParalelo: boolean = false;
  addPeriodo: boolean = false;
  tipoGradoList: any;
  selectedTipoGrado

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
    this.cargarDatos();
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
    jQuery('.nav-tabs').on('shown.bs.tab', 'a', (e) => {
      if (e.relatedTarget) jQuery(e.relatedTarget).removeClass('active');
    });
    jQuery('#popover1, #popover2').popover();
    jQuery('#markdown-editor').markdown();
    jQuery('.js-slider').slider();
    jQuery('#colorpicker').colorpicker(this.colorOptions);
    jQuery('.selectpicker').selectpicker();
  }

  cargarDatos(): void {
    this.formService.getAtributosEstructuraClase()
    .then(data => this.estructuraAcademica = data)
    .catch(err => this.messengerDemo.mensajeError());
    this.getTipoGradoList();
  }

  unmask(event) {
    return event.replace(/\D+/g, '');
  }

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  selectTipoGradoChanged(e: any): void {
    this.selectedTipoGrado = e.value;
  }

  getTipoGradoList(): void {
    promiseMessage(this.formService.getTipoGradoList(), this.messengerDemo, data => {
      this.tipoGradoList = data;
    });
  }

  agregarAreaAcademica(): void {
    if (this.nombreAreaAcademica) {
      let date = { descripcion: '' , };
      date.descripcion = this.nombreAreaAcademica;
      this.agregarParametro('/academica/agregar-area', date, () => {
        this.estructuraAcademica.area_academica.push(date);
        this.nombreAreaAcademica = '';
        this.addAreaAcademica = false; 
      });
    }
  }

  agregarTipoGrado(): void  {
    if (this.nombreTipoGrado) {
      let date = { descripcion: '' };
      date.descripcion = this.nombreTipoGrado;
      this.agregarParametro('/academica/agregar-tipogrado', date, ()=> {
        this.estructuraAcademica.tipo_grado.push(date);
        this.nombreTipoGrado = '';
        this.addTipoGrado = false;
        this.getTipoGradoList();
      });
    }    
  }

  agregarGrado(): void  {
    if (this.nombreGrado) {
      let date = { descripcion: '', idTipoGrado: ''};
      date.descripcion = this.nombreGrado;
      date.idTipoGrado = this.selectedTipoGrado;
      this.agregarParametro('/academica/agregar-grado', date, ()=> {
        this.estructuraAcademica.grado.push(date);
        this.nombreGrado = '';
        this.addGrado = false; 
      });     
    }
  }

  agregarTipoCurso(): void  {
    if (this.nombreTipoCurso) {
      let date = { descripcion: '' };
      date.descripcion = this.nombreTipoCurso;
      this.agregarParametro('/academica/agregar-tipocurso', date, ()=> {
        this.estructuraAcademica.tipo_curso.push(date);
        this.nombreTipoCurso = '';
        this.addTipoCurso = false; 
      });
    }
  }

  agregarParalelo(): void  {
    if (this.nombreParalelo) {
      let date = { descripcion: '' };
      date.descripcion = this.nombreParalelo;
      this.agregarParametro('/academica/agregar-paralelo', date, ()=> {
        this.estructuraAcademica.paralelo.push(date);
        this.nombreParalelo = '';
        this.addParalelo = false; 
      });
    }  
  }

  agregarPeriodo(): void {
    if (this.periodo.descripcion && this.periodo.fechaInicio && this.periodo.fechaFin) {
      let date = { descripcion: '', fecha_inicio: '', fecha_fin: ''};
      date.descripcion = this.periodo.descripcion;
      date.fecha_inicio = this.periodo.fechaInicio;
      date.fecha_fin = this.periodo.fechaFin;
      this.agregarParametro('/academica/agregar-periodo', date, ()=> {
        this.estructuraAcademica.periodo.push(date);
        this.periodo.descripcion = '';
        this.periodo.fechaInicio = '';
        this.periodo.fechaFin = ''; 
        this.addPeriodo = false; 
      });
    }
    
  }

  agregarParametro(url, parametro, callback): void {
    addParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  eliminarAreaAcademica(area): void {
    this.eliminarParametro('/academica/desactivar-area', area.id_area_academica, ()=> {
      let newEstructura = eliminarParametroObj(area, this.estructuraAcademica.area_academica);
      this.estructuraAcademica.area_academica = newEstructura;
    });
  }

  eliminarTipoGrado(tipogrado): void {
    this.eliminarParametro('/academica/desactivar-tipogrado', tipogrado.id_tipo_grado, ()=> {
      let newEstructura = eliminarParametroObj(
        tipogrado, this.estructuraAcademica.tipo_grado);
      this.estructuraAcademica.tipo_grado = newEstructura;
    });
  }

  eliminarGrado(grado): void {
    this.eliminarParametro('/academica/desactivar-grado', grado.id_grado, ()=> {
      let newEstructura = eliminarParametroObj(
        grado, this.estructuraAcademica.grado);
      this.estructuraAcademica.grado = newEstructura;
    });
  }

  eliminarTipoCurso(tipoCurso): void {
    this.eliminarParametro('/academica/desactivar-tipocurso', tipoCurso.id_tipo_curso, ()=> {
      let newEstructura = eliminarParametroObj(
        tipoCurso, this.estructuraAcademica.tipo_curso);
      this.estructuraAcademica.tipo_curso = newEstructura;
    });
  }

  eliminarParalelo(paralelo): void {
    this.eliminarParametro('/academica/desactivar-paralelo', paralelo.id_paralelo, ()=> {
      let newEstructura = eliminarParametroObj(
        paralelo, this.estructuraAcademica.paralelo);
      this.estructuraAcademica.paralelo = newEstructura;
    });
  }

  desactivarPeriodo(thisPeriodo): void {
    this.eliminarParametro('/academica/desactivar-periodo', thisPeriodo.id_periodo, ()=> {
       thisPeriodo.estado = false;
    });
  }

  ActivarPeriodo(thisPeriodo): void {
    this.eliminarParametro('/academica/activar-periodo', thisPeriodo.id_periodo, ()=> {
       thisPeriodo.estado = true;
    });
  }

  eliminarParametro(url, parametro, callback){
    deleteParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

}
