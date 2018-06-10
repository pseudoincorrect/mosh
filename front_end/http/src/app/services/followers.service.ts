import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowersService extends DataService{

  constructor(http: Http) {
    const url: string = "https://api.github.com/users/mosh-hamedani/followers";
    super(url, http);
   }
}
