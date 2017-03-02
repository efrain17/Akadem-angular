import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../../forms.service';
import { AtributosClase } from '../../../common/interfaces';
import { MessengerDemo } from '../../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { deleteParametro, eliminarParametroObj, addParametro } from '../../../common/funtions';
import { promiseMessage } from '../../../common/funtions';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
declare var jQuery: any;

@Component({
  selector: '[clase-estudiante]',
  templateUrl: './clase-estudiante.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../scss/tables-dynamic.style.scss',
    '../../scss/notifications.style.scss',
    '../../scss/elements.style.scss'
  ],
  providers: [MessengerDemo]
})

export class ClaseEstudiante {
  domSharedStylesHost: any;
  colorOptions: Object = {color: '#f0b518'};
  select2OptionsCurso: any;
  select2OptionsTemplate: any;
  estudiantes: any;
  estudiantesSearch: any;
  asignaturas: any = [];
  cursos: any;
  selectedEstudiante = null;
  selectedCurso;

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

    this.getCursosEstudiantes();
    this.getEstudiantesSearch();
    this.getCursos();
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
    this.select2OptionsTemplate = {
      theme: 'bootstrap',
      templateResult: this.templateResult
    };
    this.select2OptionsCurso = {
      theme: 'bootstrap',
      templateResult: this.templateCursos
    };
  }

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) return state.text;
    return jQuery(
      '<span><b>' + state.id + '</b><br>' + state.text + ' <br>' + state.additional + '</span>');
  }

  public templateCursos: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) return state.text;
    return jQuery('<span><b>' + state.text + '</b> <br>' + state.additional + '</span>');
  }

  cargarLista(lista, data): void {
    lista = [];
    data.map(date => lista.push(date.descripcion));
    return lista;
  }

  selectCurso(e: any): void {
    this.selectedCurso = e.value;
    this.getAsignaturas(this.selectedCurso);
  }

  selectEstudiante(e: any): void {
    this.selectedEstudiante = e.value;
  }

  getIdLista(data, datefien) {
    return data = data.find(date => date.descripcion === datefien);
  }

  getIdListaText(data, datefien) {
    return data = data.find(date => date.id === datefien);
  }

  agregarClaseEstudiante(): void {
    let date = { nombre: '', id_estudiante: '', curso: '', clases: [], estado: false };
    date.id_estudiante = this.selectedEstudiante;
    date.nombre = this.getIdListaText(this.estudiantesSearch, this.selectedEstudiante).text;
    date.curso =  this.getIdListaText(this.cursos, this.selectedCurso).text;
    date.clases = this.asignaturas;
    // this.agregarParametro('/educacion/agregar-clase-estudiante', date, () => {
    // date.clases = this.asignaturas.map(data => data.descripcion);
    // this.estudiantes.push(date); 
    // });
    date.clases = this.asignaturas.map(data => data.descripcion);
    this.estudiantes.push(date);
  }

  agregarParametro(url, parametro, callback): void {
    addParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  desactivarClase(clase): void {
    // this.eliminarParametro('/educacion/descactivar-clase', clase, ()=> {
    //   clase.estado = false;
    // });
    clase.estado = false;
  }

  activarClase(clase): void {
    // this.eliminarParametro('/educacion/descactivar-clase', clase, ()=> {
    //   clase.estado = true;
    // });
    clase.estado = true;
  }

  eliminarParametro(url, parametro, callback) {
    deleteParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  eliminarAsignatura(asignatura){
    this.asignaturas = eliminarParametroObj(asignatura, this.asignaturas);
  }

  getCursos(): void {
    promiseMessage(this.formService.getCursos(), this.messengerDemo, data => {
      this.cursos = data

    });
  }

  getEstudiantesSearch(): void {
    promiseMessage(this.formService.getEstudiantes(), this.messengerDemo, data =>
      this.estudiantesSearch = data);
  }

  getCursosEstudiantes(): void {
    promiseMessage(this.formService.getCursosEstudiantes(), this.messengerDemo, data =>
      this.estudiantes = data);
  }

  getClaseEstudiante(estudiante): void {
    promiseMessage(this.formService.getClaseEstudiante(estudiante.id_estudiante), this.messengerDemo, data =>
     estudiante.clases = data);
  }

  getAsignaturas(idCurso): void {
    promiseMessage(this.formService.getClasesCurso(idCurso), this.messengerDemo, data =>
      this.asignaturas = data);
  }

}
