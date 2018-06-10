import { BadRequestError } from './../common/errors/bad-request-error';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { NotFoundError } from '../common/errors/not-found-error';
import { AppError } from './../common/errors/app-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url: string, private http: Http) { }

  getHttp(){
    return this.http.get(this.url) 
      .map(response => response.json())
      .catch(this.handleError);
  }

  postHttp(resource) {
    return this.http.post(this.url, resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  putHttp(resource){
    return this.http.put(this.url, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.handleError);
  }

  deleteHttp(id){
    return this.http.delete(this.url + '/' + "999")
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    if(error.status == 400)
      return Observable.throw(new BadRequestError());    
    if(error.status == 404)
      return Observable.throw(new NotFoundError());
    else
      return Observable.throw(new AppError(error));
  }
}
