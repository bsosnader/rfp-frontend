import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ElasticsearchService } from './elasticsearch.service';
import { ValuesPipe } from './values.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2CompleterModule } from 'ng2-completer';
import { AggsPipe } from './aggs.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ValuesPipe,
    AggsPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    Ng2CompleterModule,
    NgbModule.forRoot()
  ],
  providers: [
    ElasticsearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
