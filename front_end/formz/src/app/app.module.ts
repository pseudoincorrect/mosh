import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TempDrivFormComponent } from './temp-driv-form/temp-driv-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TempDrivFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
