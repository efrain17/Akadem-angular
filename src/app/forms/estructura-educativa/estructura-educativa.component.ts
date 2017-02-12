import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../forms.service';
import { AtributosEstructuraClase } from '../../common/interfaces';
import { MessengerDemo } from '../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
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
  select2Options: any =
  {
    theme: 'bootstrap'
  };
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
    tipo_grado: []
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

    this.formService.getAtributosEstructuraClase()
      .then(data => this.estructuraAcademica = data)
      .catch(err => this.messengerDemo.mensajeError());
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

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  agregarAreaAcademica(): void {
    // this.agregarParametro('/educacion/agregar-area', this.nombreAreaAcademica, () => {
    //   let date = { descripcion: '' }
    //   date.descripcion = this.nombreAreaAcademica;
    //   this.estructuraAcademica.area_academica.push(date);
    //   this.nombreAreaAcademica = '';
    //   this.addAreaAcademica = false; 
    // });
    let date = { descripcion: '' }
    date.descripcion = this.nombreAreaAcademica;
    this.estructuraAcademica.area_academica.push(date);
    this.nombreAreaAcademica = '';
    this.addAreaAcademica = false;
  }

  agregarTipoGrado(): void  {
    // this.agregarParametro('/educacion/agregar-tipogrado', this.nombreTipoGrado, ()=> {
    //   let date = { descripcion: '' }
    //   date.descripcion = this.nombreTipoGrado;
    //   this.estructuraAcademica.tipo_grado.push(date);
    //   this.nombreTipoGrado = '';
    //   this.addTipoGrado = false; 
    // });
    let date = { descripcion: '' }
    date.descripcion = this.nombreTipoGrado;
    this.estructuraAcademica.tipo_grado.push(date);
    this.nombreTipoGrado = '';
    this.addTipoGrado = false;
  }

  agregarGrado(): void  {
    // this.agregarParametro('/educacion/agregar-grado', this.nombreGrado, ()=> {
    //   let date = { descripcion: '' }
    //   date.descripcion = this.nombreGrado;
    //   this.estructuraAcademica.grado.push(date);
    //   this.nombreGrado = '';
    //   this.addGrado = false; 
    // });
    let date = { descripcion: '' }
    date.descripcion = this.nombreGrado;
    this.estructuraAcademica.grado.push(date);
    this.nombreGrado = '';
    this.addGrado = false;
  }

  agregarTipoCurso(): void  {
    // this.agregarParametro('/educacion/agregar-tipocurso', this.nombreTipoCurso, ()=> {
    //   let date = { descripcion: '' }
    //   date.descripcion = this.nombreTipoCurso;
    //   this.estructuraAcademica.tipo_curso.push(date);
    //   this.nombreTipoCurso = '';
    //   this.addTipoCurso = false; 
    // });
    let date = { descripcion: '' }
    date.descripcion = this.nombreTipoCurso;
    this.estructuraAcademica.tipo_curso.push(date);
    this.nombreTipoCurso = '';
    this.addTipoCurso = false;    
  }

  agregarParalelo(): void  {
    // this.agregarParametro('/educacion/agregar-paralelo', this.nombreParalelo, ()=> {
    //   let date = { descripcion: '' }
    //   date.descripcion = this.nombreParalelo;
    //   this.estructuraAcademica.paralelo.push(date);
    //   this.nombreParalelo = '';
    //   this.addParalelo = false; 
    // });
    let date = { descripcion: '' }
    date.descripcion = this.nombreParalelo;
    this.estructuraAcademica.paralelo.push(date);
    this.nombreParalelo = '';
    this.addParalelo = false;
  }

  agregarParametro(url, parametro, callback): void {  
    this.formService.deleteAtributosEstrClase(url, parametro)
    .then(data => callback())
    .catch(err => this.messengerDemo.mensajeError());   
  }

  eliminarAreaAcademica(area): void {
    // this.eliminarParametro('/educacion/eliminar-area', area.id, ()=> {
    //   let newEstructura = this.eliminarParametroObj(area, this.estructuraAcademica.area_academica);
    //   this.estructuraAcademica.area_academica = newEstructura;
    // });
    let newEstructura = this.eliminarParametroObj(area, this.estructuraAcademica.area_academica);
    this.estructuraAcademica.area_academica = newEstructura;
  }

  eliminarTipoGrado(tipogrado): void {
    // this.eliminarParametro('/educacion/eliminar-tipogrado', tipogrado, ()=> {
    //   let newEstructura = this.eliminarParametroObj(tipogrado, this.estructuraAcademica.tipo_grado);
    //   this.estructuraAcademica.tipo_grado = newEstructura;
    // });
    let newEstructura = this.eliminarParametroObj(tipogrado, this.estructuraAcademica.tipo_grado);
    this.estructuraAcademica.tipo_grado = newEstructura;
  }

  eliminarGrado(grado): void {
    // this.eliminarParametro('/educacion/eliminar-grado', grado, ()=> {
    //   let newEstructura = this.eliminarParametroObj(grado, this.estructuraAcademica.grado);
    //   this.estructuraAcademica.grado = newEstructura;
    // });
    let newEstructura = this.eliminarParametroObj(grado, this.estructuraAcademica.grado);
    this.estructuraAcademica.grado = newEstructura;
  }

  eliminarTipoCurso(tipoCurso): void {
    // this.eliminarParametro('/educacion/eliminar-curso', tipoCurso, ()=> {
    //   let newEstructura = this.eliminarParametroObj(tipoCurso, this.estructuraAcademica.tipo_curso);
    //   this.estructuraAcademica.tipo_curso = newEstructura;
    // });
    let newEstructura = this.eliminarParametroObj(tipoCurso, this.estructuraAcademica.tipo_curso);
    this.estructuraAcademica.tipo_curso = newEstructura;
  }

  eliminarParalelo(paralelo): void {
    // this.eliminarParametro('/educacion/eliminar-paralelo', paralelo, ()=> {
    //   let newEstructura = this.eliminarParametroObj(paralelo, this.estructuraAcademica.paralelo);
    //   this.estructuraAcademica.paralelo = newEstructura;
    // });
    let newEstructura = this.eliminarParametroObj(paralelo, this.estructuraAcademica.paralelo);
    this.estructuraAcademica.paralelo = newEstructura;
  }

  eliminarParametroObj(param, paramArray) {
    return paramArray.filter(data => data !== param);
  }

  eliminarParametro(url, parametro, callback){
    this.formService.deleteAtributosEstrClase(url, parametro)
    .then(data => callback())
    .catch(err => this.messengerDemo.mensajeError());
  }

}
