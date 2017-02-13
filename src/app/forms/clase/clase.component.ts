import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../forms.service';
import { AtributosAsignatura } from '../../common/interfaces';
import { MessengerDemo } from '../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { deleteParametro, eliminarParametroObj, addParametro } from '../../common/funtions'
declare var jQuery: any;

@Component({
  selector: '[clase]',
  templateUrl: './clase.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../scss/tables-dynamic.style.scss',
    '../scss/notifications.style.scss',
    '../scss/elements.style.scss'
  ],
  providers: [MessengerDemo]
})
export class Clase {
  domSharedStylesHost: any;
  select2Options: any =
  {
    theme: 'bootstrap'
  };
  colorOptions: Object = {color: '#f0b518'};
  dataAsignatura: AtributosAsignatura = 
  {
    area_academica: [], 
    asignatura: [],
  };
  periodo: any = {
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
  }
  nombreAsignatura;
  selectedAreaAcademica;
  addAsignatura: boolean = false;
  areasAcademicas: any = [];

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

    this.formService.getAtributosAsignatura()
      .then(data => {
        this.dataAsignatura = data;
        this.areasAcademicas = [];
        data.area_academica.map(date => this.areasAcademicas.push(date.descripcion));
        this.selectedAreaAcademica = this.areasAcademicas[0];
      })
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

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }
  
  selectAreaAcademica(e: any): void {
    this.selectedAreaAcademica = e.value;
  }

  getAreaAcademica(): void {
    return this.areasAcademicas;
  }

  agregarAsignatura(): void {
    if (this.nombreAsignatura) {
      // this.agregarParametro('/educacion/agregar-asignatura', this.nombreAsignatura, () => {
      //   let date = { descripcion: '', area_academica: '', estado: '' }
      //   date.descripcion = this.nombreAsignatura;
      //   date.area_academica = this.selectedAreaAcademica;
      //   this.dataAsignatura.asignatura.push(date);
      //   this.nombreAsignatura = '';
      //   this.addAsignatura = false; 
      // });
      let date = { descripcion: '', area_academica: '', estado: true }
      date.descripcion = this.nombreAsignatura;
      date.area_academica = this.selectedAreaAcademica;
      this.dataAsignatura.asignatura.push(date);
      this.nombreAsignatura = '';
      this.addAsignatura = false;
    }
  }

  agregarParametro(url, parametro, callback): void {
    addParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  eliminarAreaAcademica(area): void {
    // this.eliminarParametro('/educacion/eliminar-area', area.id, ()=> {
    //   let newEstructura = this.eliminarParametroObj(area, this.estructuraAcademica.area_academica);
    //   this.estructuraAcademica.area_academica = newEstructura;
    // });
  }

  desactivarAsignatura(asignatura): void {
    // this.eliminarParametro('/educacion/descactivar-asignatura', asignatura, ()=> {
    //   asignatura.estado = false;
    // });
    asignatura.estado = false;
  }

  activarAsignatura(asignatura): void {
    // this.eliminarParametro('/educacion/descactivar-asignatura', asignatura, ()=> {
    //   asignatura.estado = true;
    // });
    asignatura.estado = true;
  }

  eliminarParametro(url, parametro, callback) {
    deleteParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

}
