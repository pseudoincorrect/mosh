import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LikesCountService {

  constructor() {
   }
  getInfo() {
    return ({
      isSel: false,
      likeNumb: 21
    });
  }
}
