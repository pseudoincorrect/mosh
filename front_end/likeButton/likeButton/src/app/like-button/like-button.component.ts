import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

  @Input() isSelected: boolean;
  likeNumber: number;

  constructor(isSelected: boolean, likeNumber: number) { }

  ngOnInit() {
  }

  onClick() {
    this.isSelected = !this.isSelected;
  }

}


