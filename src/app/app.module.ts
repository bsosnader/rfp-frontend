import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { DataService } from './data.service';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
