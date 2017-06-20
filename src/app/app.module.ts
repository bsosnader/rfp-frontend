import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SearchComponent, SearchModule } from './search/index';
import { ElasticsearchService } from './elasticsearch.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SearchModule,
    NgbModule.forRoot()
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
