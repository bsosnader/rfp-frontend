import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './search.component';


@NgModule({
  imports: [
    SharedModule,
    NgxPaginationModule,
    NgbModule,
    ],
  declarations: [SearchComponent],

})
export class SearchModule { }
