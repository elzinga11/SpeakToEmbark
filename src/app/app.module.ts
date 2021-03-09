import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RoleplayComponent } from './roleplay/roleplay.component';

@NgModule({
  declarations: [
    AppComponent,
    RoleplayComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
