import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Headers, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormsService {
  BASE_URL = 'http://192.168.1.10:9000/api';

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
    let url = this.BASE_URL + '/personas/personas';
    return this.getServer(url);
  }

  getAtributoPersonas() {
    let url =  this.BASE_URL + '/personas/atributos-personas';
    return this.getServer(url);
  }

  getAtributosEstructuraClase() {
    let url = this.BASE_URL + '/academica/estructura-academica';
    return this.getServer(url);
  }

  getAreasAcademica() {
    let url = this.BASE_URL + '/academica/area-academica';
    return this.getServer(url);
  }

  getAsignaturas() {
    let url = this.BASE_URL + '/academica/asignatura';
    return this.getServer(url);
  }

  getAtributoClase() {
    let url = '/assets/data/dataClase.json';
    return this.getServer(url);
  }

  getAtributosClase() {
    let url = this.BASE_URL + '/academica/atributos-clase';
    return this.getServer(url);
  }

  getClases() {
    let url = this.BASE_URL + '/academica/clase';
    return this.getServer(url);
  }

  getCursosEstudiantes() {
    let url = this.BASE_URL + '/academica/cursos-estudiantes';
    return this.getServer(url);
  }

  getClaseEstudiante(id) {
    console.log(id);
    let url = this.BASE_URL + '/academica/clase-estudiante?id=' + id;
    return this.getServer(url);
  }

  getCursos() {
    let url = this.BASE_URL + '/academica/curso-inscrito';
    return this.getServer(url);
  }

  getEstudiantes() {
    let url = this.BASE_URL + '/academica/estudiante-clase';
    return this.getServer(url);
  }

  getAtributosCurso() {
    let url = this.BASE_URL + '/academica/atributos-curso';
    return this.getServer(url);
  }

  getDataCursos() {
    let url = this.BASE_URL + '/academica/data-curso';
    return this.getServer(url);
  }

  getClasesCurso(idCurso) {
    let url = this.BASE_URL + '/academica/clases-curso?id=' + idCurso;
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
