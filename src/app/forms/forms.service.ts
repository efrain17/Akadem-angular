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
    let body = JSON.stringify(params);
    let headers = new Headers({'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers,
      method: RequestMethod.Post
    });
    return this.http.post(this.BASE_URL + '/guardar-persona', body, options)
      .toPromise()
      .catch(this.error);
  }

  getCarteraAutoPagoHabil(){
    let url = this.BASE_URL + '/deudoresAutoPagoHabil';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
  }

  error(error: any){
    return Promise.reject(error.message || error);
  }

}
