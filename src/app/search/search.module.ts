import { NgModule } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2CompleterModule } from 'ng2-completer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NgxPaginationModule,
    Ng2CompleterModule
    ],
  declarations: [],
  exports: [
    NgxPaginationModule,
    Ng2CompleterModule,

  ]

})
export class SearchModule { }
