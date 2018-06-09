import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url : string="https://jsonplaceholder.typicode.com/posts";

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get(this.url);    
  }

  createPost(post: string) {
    return this.http.post(this.url, post);
  }
}
