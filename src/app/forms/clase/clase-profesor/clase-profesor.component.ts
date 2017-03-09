import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../../forms.service';
import { AtributosClase } from '../../../common/interfaces';
import { MessengerDemo } from '../../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { deleteParametro, eliminarParametroObj, addParametro } from '../../../common/funtions';
import { promiseMessage } from '../../../common/funtions';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

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
  select2Options: any = { theme: 'bootstrap' };
  select2OptionsTemplate: any;
  asignaturas;
  profesores;
  cursos;
  clases;
  selectedAsignatura = null;
  selectedProfesor: any = {id: '', text: ''}
  selectedCurso = null;
  findProfesor: boolean = false;
  atributosClase: AtributosClase =
  {
    profesor: [],
    curso: [],
    asignatura: [],
    clase: []
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
    this.getAtributosClase();
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
  }

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  public templateSelection: Select2TemplateFunction = (
    state: Select2OptionData): JQuery | string =>
  {
    if (!state.id) return state.text;
    return jQuery(
      '<span><b>' + state.additional.winner + '.</b> ' + state.text + '</span>');
  }

  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) return state.text;

    return jQuery('<span><b>' + state.id + '</b> <br>' + state.text + '</span>');
  }

  cargarLista(lista, data): void {
    lista = [];
    data.map(date => lista.push(date.descripcion));
    return lista;
  }

  selectAsignatura(e: any): void {
    this.selectedAsignatura = e.value;
  }

  selectProfesor(e: any): void {
    this.selectedProfesor = e.value;
    console.log(this.selectedProfesor);
  }

  selectCurso(e: any): void {
    this.selectedCurso = e.value;
  }

  getIdLista(data, datefien) {
    return data = data.find(date => date.descripcion === datefien);
  }

  getIdListaText(data, datefien) {
    return data = data.find(date => date.id === datefien);
  }

  agregarClase(): void {
    if (this.selectedProfesor.id) {
      let date = { profesor: '', asignatura: '', curso: '', estado: false };
      date.profesor = this.selectedProfesor.text;
      date.asignatura = this.selectedAsignatura;
      date.curso = this.selectedCurso;
      let dateId = { id_profesor: '', id_asignatura: '', id_curso: ''};
      dateId.id_profesor = this.selectedProfesor.id;
      dateId.id_asignatura = this.getIdLista(
        this.atributosClase.asignatura, this.selectedAsignatura).id_asignatura;
      dateId.id_curso = this.getIdLista(
        this.atributosClase.curso, this.selectedCurso).id_curso;
      this.agregarParametro('/academica/agregar-clase', dateId, () => {
        this.atributosClase.clase.push(date);
        this.selectedProfesor = '';
        // this.selectedProfesor.text = '';
      });
    }    
  }

  agregarParametro(url, parametro, callback): void {
    addParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  desactivarClase(clase): void {
    this.eliminarParametro('/academica/desactivar-clase', clase.id_clase, ()=> {
      clase.estado = false;
    });
  }

  activarClase(clase): void {
    this.eliminarParametro('/academica/activar-clase', clase.id_clase, ()=> {
      clase.estado = true;
    });
  }

  eliminarParametro(url, parametro, callback) {
    deleteParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  getAtributosClase() {
    promiseMessage(this.formService.getAtributosClase(), this.messengerDemo, data => {
      this.atributosClase = data;
      this.getClases();
      this.cursos = this.cargarLista(this.cursos, data.curso);
      this.asignaturas = this.cargarLista(this.asignaturas, data.asignatura);
      // this.selectedProfesor = this.profesores[0];
      this.selectedCurso = this.cursos[0];
      this.selectedAsignatura = this.asignaturas[0];
    });
  }

  getProfesoresLike(event: any) {
    promiseMessage(this.formService.getProfesoresLike(event.target.value), this.messengerDemo, data => {
      this.profesores = data;
    });
  }

  getClases() {
    promiseMessage(this.formService.getClases(), this.messengerDemo, data => {
      this.atributosClase.clase = data;
    });
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? [] : this.profesores);

  formatter = (x:any) => x.text;

}
