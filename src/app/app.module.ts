import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { AppRoutingModule } from './app-routing.module';
// import { PlayvideotestComponent } from './playvideotest/playvideotest.component';

@NgModule({
  declarations: [
    AppComponent,
    ParagraphComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
