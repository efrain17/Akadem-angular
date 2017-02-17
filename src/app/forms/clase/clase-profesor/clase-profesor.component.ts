import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../../forms.service';
import { AtributosClase } from '../../../common/interfaces';
import { MessengerDemo } from '../../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { deleteParametro, eliminarParametroObj, addParametro } from '../../../common/funtions';
declare var jQuery: any;

@Component({
  selector: '[clase-profesor]',
  templateUrl: './clase-profesor.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../scss/tables-dynamic.style.scss',
    '../../scss/notifications.style.scss',
    '../../scss/elements.style.scss'
  ],
  providers: [MessengerDemo]
})
export class ClaseProfesor {
  domSharedStylesHost: any;
  colorOptions: Object = {color: '#f0b518'};
  select2Options: any = {theme: 'bootstrap'};
  asignaturas;
  profesores;
  cursos;
  clases;
  selectedAsignatura;
  selectedProfesor;
  selectedCurso;
  selectedClase;
  atributosClase: AtributosClase =
  {
    profesor: [],
    curso: [],
    asignatura: [],
    clase: []
  }  

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

    this.formService.getAtributosClase()
      .then(data => {
        this.atributosClase = data;
        this.profesores = this.cargarLista(this.profesores, data.profesor);
        this.cursos = this.cargarLista(this.cursos, data.curso);
        this.asignaturas = this.cargarLista(this.asignaturas, data.asignatura);
        this.clases = this.cargarLista(this.clases, data.clase);
        this.selectedProfesor = this.profesores[0];
        this.selectedCurso = this.cursos[0];
        this.selectedAsignatura = this.asignaturas[0];
        this.selectedClase = this.clases[0];
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

  cargarLista(lista, data): void {
    lista = [];
    data.map(date => lista.push(date.descripcion));
    return lista;
  }  

  selectAsignatura(e: any): void {
    // this.selectedAreaAcademica = e.value;
  }

  selectProfesor(e: any): void {
    // this.selectedAreaAcademica = e.value;
  }

  selectCurso(e: any): void {
    // this.selectedAreaAcademica = e.value;
  }

  getIdLista(data, datefien) {
    return data = data.find(date => date.descripcion == datefien);
  }

  agregarClase(): void {
    // if (this.nombreAsignatura) {
    //   let date = { descripcion: '', area_academica: '', id_area_academica: '', estado: false }
    //   date.descripcion = this.nombreAsignatura;
    //   date.area_academica = this.selectedAreaAcademica;
    //   date.id_area_academica = this.getIdLista(this.dataAsignatura.area_academica, this.selectedAreaAcademica).id_area_academica;
    //   // this.agregarParametro('/educacion/agregar-asignatura', date, () => {
    //   //   this.dataAsignatura.asignatura.push(date);
    //   //   this.nombreAsignatura = '';
    //   //   this.addAsignatura = false; 
    //   // });
    //   this.dataAsignatura.asignatura.push(date);
    //   this.nombreAsignatura = '';
    //   this.addAsignatura = false;
    // }
  }

  agregarParametro(url, parametro, callback): void {
    addParametro(url, parametro, callback, this.formService, this.messengerDemo);
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
