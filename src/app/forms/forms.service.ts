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
    let body = { data:{} };
    body.data=params;
    let headers = new Headers({'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers,
      method: RequestMethod.Post
    });
    return this.http.post(this.BASE_URL + '/personas/guardar-persona', body, options)
      .toPromise()
      .catch(this.error);
  }

  updatePersona(id: string ,params: Object) {
    let body = { id_persona: '', data:{} };
    body.id_persona = id;
    body.data = params;
    let headers = new Headers({'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers,
      method: RequestMethod.Post
    });
    return this.http.post(this.BASE_URL + '/personas/actualizar-persona', body, options)
      .toPromise()
      .catch(this.error);
  }

  getPersonas(){
    let url = '/assets/data/dataPersonas.json';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  error(error: any){
    return Promise.reject(error.message || error);
  }

}
