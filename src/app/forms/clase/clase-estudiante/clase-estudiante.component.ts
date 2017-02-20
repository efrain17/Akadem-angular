import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../../forms.service';
import { AtributosClase } from '../../../common/interfaces';
import { MessengerDemo } from '../../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { deleteParametro, eliminarParametroObj, addParametro } from '../../../common/funtions';
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
  selectedCurso = null;

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
    }
    this.select2OptionsCurso = {
      theme: 'bootstrap',
      templateResult: this.templateCursos
    }
  }

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) return state.text;
    return jQuery('<span><b>' + state.id + '</b> <br>' + state.text + ' <br>' + state.additional + '</span>');
  }

  public templateCursos: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) return state.text;
    return jQuery('<span><b>'+ state.text +'</b> <br>' + state.additional + '</span>');
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
    return data = data.find(date => date.descripcion == datefien);
  }

  getIdListaText(data, datefien) {
    return data = data.find(date => date.id == datefien);
  }

  // agregarClase(): void {
  //     let date = { profesor: '', asignatura: '', curso: '', estado: false }
  //     date.profesor = this.getIdListaText(this.atributosClase.profesor, this.selectedProfesor).text;
  //     date.asignatura = this.selectedAsignatura;
  //     date.curso = this.selectedCurso;
  //     let dateId = { id_profesor: '', id_asignatura: '', id_curso: ''}
  //     dateId.id_profesor = this.selectedProfesor;
  //     dateId.id_asignatura = this.getIdLista(this.atributosClase.asignatura, this.selectedAsignatura).id_asignatura;
  //     dateId.id_curso = this.getIdLista(this.atributosClase.curso, this.selectedCurso).id_curso;
  //     // this.agregarParametro('/educacion/agregar-clase', dateId, () => {
  //     //   this.atributosClase.clase.push(date); 
  //     // });
  //     this.atributosClase.clase.push(date); 
  // }
  agregarClaseEstudiante(): void {

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

  getCursos(): void {
    this.promiseMessage(this.formService.getCursos(), data => this.cursos = data.cursos)
  }

  getEstudiantesSearch(): void {
    this.promiseMessage(this.formService.getEstudiantes(), data => this.estudiantesSearch = data.estudiantes);
  }

  getCursosEstudiantes(): void {
    this.promiseMessage(this.formService.getCursosEstudiantes(), data => this.estudiantes = data.clase_estudiante);
  }

  getAsignaturas(idCurso): void {
    this.promiseMessage(this.formService.getAsignaturasCurso(idCurso), data => this.asignaturas = data.clases_curso);
  }

  promiseMessage(promise, callback): void {
    promise
    .then(data => callback(data))
    .catch(err => this.messengerDemo.mensajeError())
  }

}
