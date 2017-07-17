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
import { HelpComponent } from './help/help.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'help', component: HelpComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'search', component: SearchComponent },
  { path: 'delete', component: DeleteComponent },
  {
    path: '',
    redirectTo: '/help',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    PageNotFoundComponent
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
