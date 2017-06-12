import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { DataService } from './data.service';
import { ElasticsearchService } from './elasticsearch.service';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    DataService,
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
