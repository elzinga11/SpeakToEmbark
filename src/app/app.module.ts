import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RoleplayComponent } from './roleplay/paragraph.component';
import { PlayvideotestComponent } from './playvideotest/playvideotest.component';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';

@NgModule({
  declarations: [
    AppComponent,
    RoleplayComponent,
    PlayvideotestComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
