import { FollowersService } from './services/followers.service';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppErrorhandler } from './common/errors/app-error-handler';
import { PostComponent } from './post/post.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { DataService } from './services/data.service';
import { PostService } from './services/post.service';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { TempDrivFormComponent } from './temp-driv-form/temp-driv-form.component';
import { MoshFollowersComponent } from './mosh-followers/mosh-followers.component';

@NgModule({
  declarations: [
    AppComponent,
    TempDrivFormComponent,
    ReactiveFormComponent,
    SignupFormComponent,
    PostComponent,
    MoshFollowersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule  
  ],
  providers: [
    PostService,
    DataService,
    FollowersService,
    {provide: ErrorHandler, useClass: AppErrorhandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
