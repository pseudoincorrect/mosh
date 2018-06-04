import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LikeButtonComponent } from './like-button/like-button.component';
import { LikesCountService } from './likes-count.service';

@NgModule({
    declarations: [
        AppComponent,
        LikeButtonComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCheckboxModule
    ],
    providers: [
        LikesCountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
