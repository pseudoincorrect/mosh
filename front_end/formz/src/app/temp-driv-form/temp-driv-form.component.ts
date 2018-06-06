import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp-driv-form',
  templateUrl: './temp-driv-form.component.html',
  styleUrls: ['./temp-driv-form.component.css']
})
export class TempDrivFormComponent implements OnInit {

  categories = [
    {id:1, name:"category 1"},
    {id:2, name:"category 2"},
    {id:3, name:"category 3"},
  ];

  constructor() { }

  ngOnInit() {
  }
}
