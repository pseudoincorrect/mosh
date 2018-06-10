import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService{

  constructor(http: Http){
    const url: string = "https://jsonplaceholder.typicode.com/posts";
    super(url, http);
  }
}
