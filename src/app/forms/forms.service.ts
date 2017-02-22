import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Headers, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormsService {
  BASE_URL = 'http://localhost:9000/api';

  constructor(private http: Http ) { }

  guardarPersona(params: Object) {
    let body = { data: {} };
    body.data = params;
    let url = '/personas/guardar-persona';
    return this.postServerAppJson(url, body);
  }

  updatePersona(id: string, params: Object) {
    let body = { id_persona: '', data: {} };
    body.id_persona = id;
    body.data = params;
    let url = '/personas/actualizar-persona';
    return this.postServerAppJson(url, body);
  }

  postServerAppJson(url, body) {
    let headers = new Headers({'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers,
      method: RequestMethod.Post
    });
    return this.http.post(this.BASE_URL + url, body, options)
    .toPromise()
    .catch(this.error);
  }

  getPersonas() {
    let url = '/assets/data/dataPersonas.json';
    return this.getServer(url);
  }

  getAtributoPersonas() {
    let url = '/assets/data/dataAtributosPersona.json';
    return this.getServer(url);
  }

  getAtributosEstructuraClase() {
    let url = '/assets/data/dataAtributosEstructuraAcademica.json';
    return this.getServer(url);
  }

  getAreasAcademica() {
    let url = '/assets/data/data-asignatura/dataAreaAcademica.json';
    return this.getServer(url);
  }

  getAsignaturas() {
    let url = '/assets/data/data-asignatura/dataAsignatura.json';
    return this.getServer(url);
  }

  getAtributoClase() {
    let url = '/assets/data/dataClase.json';
    return this.getServer(url);
  }

  getAtributosClase() {
    let url = '/assets/data/clase-profesor/dataAtributosClase.json';
    return this.getServer(url);
  }

  getClases() {
    let url = '/assets/data/clase-profesor/dataClases.json';
    return this.getServer(url);
  }

  getCursosEstudiantes() {
    let url = '/assets/data/dataClase/dataClaseEstudiante.json';
    return this.getServer(url);
  }

  getCursos() {
    let url = '/assets/data/dataClase/dataClaseCurso.json';
    return this.getServer(url);
  }

  getEstudiantes() {
    let url = '/assets/data/dataClase/dataEstudiantes.json';
    return this.getServer(url);
  }

  getAtributosCurso() {
    let url = '/assets/data/data-asignatura/dataAtributosCurso.json';
    return this.getServer(url);
  }

  getDataCursos() {
    let url = '/assets/data/data-asignatura/dataCurso.json';
    return this.getServer(url);
  }

  getAsignaturasCurso(idCurso) {
    // consultar por idCurso
    let url = '/assets/data/dataClase/dataClasesCurso.json';
    return this.getServer(url);
  }

  deleteAtributosEstrClase(url, id) {
    url = url + '?id=' + id;
    return this.getServer(url);
  }

  insertAtributosEstrClase(url, params) {
    let body = { data: {} };
    body.data = params;
    return this.postServerAppJson(url, body);
  }

  getServer(url)  {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  error(error: any) {
    return Promise.reject(error.message || error);
  }

}
