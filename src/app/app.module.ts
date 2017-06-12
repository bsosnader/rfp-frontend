import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
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
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
