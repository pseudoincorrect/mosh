import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormArray, FormControl, Validators, 
          ReactiveFormsModule } from "@angular/forms";
import { PassValidator } from "./validator";   

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  form: FormGroup;
  password : string;

  get oldPass() { return this.form.get('oldPass'); }

  get newPass() { return this.form.get('newPass'); }

  get passMatch() { return this.form.get('passMatch'); }

  ngOnInit() {
    this.password = "1234";

    this.form = new FormGroup ({    
      oldPass : new FormControl(
        '',
        [
          Validators.required,
          PassValidator.doesNotMatchOld
        ]
      ),
      newPass : new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ),
      passMatch : new FormControl(        
        '',
        [ Validators.required ]
      )
    }, 
    { validators: PassValidator.doesNotMatchNew }
  )}
}
