import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { FormsService } from '../forms.service';
import { AtributosAsignatura, AtributosCurso } from '../../common/interfaces';
import { MessengerDemo } from '../messenger/messenger.directive';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { deleteParametro, eliminarParametroObj, addParametro } from '../../common/funtions';
import { promiseMessage } from '../../common/funtions';
declare var jQuery: any;

@Component({
  selector: '[asignatura-curso]',
  templateUrl: './asignatura-curso.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../scss/tables-dynamic.style.scss',
    '../scss/notifications.style.scss',
    '../scss/elements.style.scss'
  ],
  providers: [MessengerDemo]
})
export class AsignaturaCurso {
  domSharedStylesHost: any;
  nombreAsignatura;
  nombreCurso;
  selectedAreaAcademica;
  selectedGrado;
  selectedParalelo;
  selectedPeriodo;
  selectedTipoCurso;
  addAsignatura: boolean = false;
  addCurso: boolean = false;
  areasAcademicas: any = [];
  grados: any = [];
  paralelos: any = [];
  periodos: any = [];
  tipoCursos: any = [];
  colorOptions: Object = {color: '#f0b518'};
  select2Options: any = {theme: 'bootstrap'};
  dataAsignatura: AtributosAsignatura =
  {
    area_academica: [],
    asignatura: [],
  };
  atributosCurso: AtributosCurso = {
    curso: [],
    grado: [],
    paralelo: [],
    periodo: [],
    tipo_curso: []
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
    this.getAreasAcademica();
    this.getAsignaturas();
    this.getAtributosCurso();
    this.getDataCursos();
    console.log('asignatura')
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

  ngOnDestroy(): void {
    // detach custom hook
    this.domSharedStylesHost.onStylesAdded = this.domSharedStylesHost.__onStylesAdded__;
  }

  cargarLista(lista, data): void {
    lista = [];
    data.map(date => lista.push(date.descripcion));
    return lista;
  }

  selectAreaAcademica(e: any): void {
    this.selectedAreaAcademica = e.value;
  }

  selectGrado(e: any): void {
    this.selectedGrado = e.value;
  }

  selectParalelo(e: any): void {
    this.selectedParalelo = e.value;
  }

  selectPeriodo(e: any): void {
    this.selectedPeriodo = e.value;
  }

  selectTipoCurso(e: any): void {
    this.selectedTipoCurso = e.value;
  }

  getIdLista(data, datefien) {
    return data = data.find(date => date.descripcion === datefien);
  }

  agregarAsignatura(): void {
    if (this.nombreAsignatura) {
      let date = { descripcion: '', area_academica: '', id_area_academica: '', estado: true };
      date.descripcion = this.nombreAsignatura;
      date.area_academica = this.selectedAreaAcademica;
      date.id_area_academica = this.getIdLista(
      this.dataAsignatura.area_academica, this.selectedAreaAcademica).id_area_academica;
      this.agregarParametro('/academica/agregar-asignatura', date, () => {
        this.dataAsignatura.asignatura.push(date);
        this.nombreAsignatura = '';
        this.addAsignatura = false; 
      });
    }
  }

  agregarCurso(): void {
    if (this.nombreCurso) {
      let date = {
        descripcion: '', grado: '', paralelo: '', periodo: '', tipo_curso: '', estado: false
      };
      let dateId = {
        descripcion: '', id_grado: '', id_paralelo: '', id_periodo: '', id_tipo_curso: ''
      };
      date.descripcion = this.nombreCurso;
      date.grado = this.selectedGrado;
      date.paralelo = this.selectedParalelo;
      date.periodo = this.selectedPeriodo;
      date.tipo_curso = this.selectedTipoCurso;
      dateId.descripcion = this.nombreCurso;
      dateId.id_grado = this.getIdLista(
        this.atributosCurso.grado, this.selectedGrado).id_grado;
      dateId.id_paralelo = this.getIdLista(
        this.atributosCurso.paralelo, this.selectedParalelo).id_paralelo;
      dateId.id_periodo = this.getIdLista(
        this.atributosCurso.periodo, this.selectedPeriodo).id_periodo;
      dateId.id_tipo_curso = this.getIdLista(
        this.atributosCurso.tipo_curso, this.selectedTipoCurso).id_tipo_curso;
      this.agregarParametro('/academica/agregar-curso', dateId, () => {
        this.atributosCurso.curso.push(date);
        this.nombreCurso = '';
        this.addCurso = false; 
      });
    }
  }

  agregarParametro(url, parametro, callback): void {
    addParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  desactivarAsignatura(asignatura): void {
    this.eliminarParametro('/academica/desactivar-asignatura', asignatura.id_asignatura, ()=> {
      asignatura.estado = false;
    });
  }

  activarAsignatura(asignatura): void {
    this.eliminarParametro('/academica/activar-asignatura', asignatura.id_asignatura, ()=> {
      asignatura.estado = true;
    });
  }

  desactivarCurso(curso): void {
    this.eliminarParametro('/academica/desactivar-curso', curso.id_curso, ()=> {
      curso.estado = false;
    });
  }

  activarCurso(curso): void {
    this.eliminarParametro('/academica/activar-curso', curso.id_curso, ()=> {
      curso.estado = true;
    });
  }

  eliminarParametro(url, parametro, callback) {
    deleteParametro(url, parametro, callback, this.formService, this.messengerDemo);
  }

  getAreasAcademica(): void {
    promiseMessage(this.formService.getAreasAcademica(), this.messengerDemo, data => {
      this.dataAsignatura.area_academica = data;
      this.areasAcademicas = this.cargarLista(this.areasAcademicas, data);
      this.selectedAreaAcademica = this.areasAcademicas[0];
    });
  }

  getAsignaturas(): void {
    promiseMessage(this.formService.getAsignaturas(), this.messengerDemo, data => {
      this.dataAsignatura.asignatura = data;
    });
  }

  getAtributosCurso(): void {
    promiseMessage(this.formService.getAtributosCurso(), this.messengerDemo, data => {
      this.atributosCurso = data;
      this.grados = this.cargarLista(this.grados, data.grado);
      this.paralelos = this.cargarLista(this.paralelos, data.paralelo);
      this.periodos = this.cargarLista(this.periodos, data.periodo);
      this.tipoCursos = this.cargarLista(this.tipoCursos, data.tipo_curso);
      this.selectedGrado = this.grados[0];
      this.selectedParalelo = this.paralelos[0];
      this.selectedPeriodo = this.periodos[0];
      this.selectedTipoCurso = this.tipoCursos[0];
    });
  }

  getDataCursos(): void {
    promiseMessage(this.formService.getDataCursos(), this.messengerDemo, data => {
      this.atributosCurso.curso = data;
    });
  }

}
