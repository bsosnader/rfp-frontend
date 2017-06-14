import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataComponent } from './data/data.component';
import { ElasticsearchService } from './elasticsearch.service';
import { ValuesPipe } from './values.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    ValuesPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
