import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SearchComponent, SearchModule } from './search/index';
import { UploadComponent, UploadModule } from './upload/index';
import { DeleteComponent, DeleteModule } from './delete/index';
import { ElasticsearchService } from './elasticsearch.service';
import { UploadService } from './upload.service';

const appRoutes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'search', component: SearchComponent },
  { path: 'delete', component: DeleteComponent },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
  //{ path: '**', component: PageNotFoundComponent} TODO make a page not found component
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    SharedModule,
    SearchModule,
    UploadModule,
    DeleteModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    ElasticsearchService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
