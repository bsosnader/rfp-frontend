import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ValuesPipe } from './values.pipe';
import { AggsPipe } from './aggs.pipe';
import { DateArrPipe } from './date-arr.pipe';
import { Ng2CompleterModule } from 'ng2-completer';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValuesPipe,
    AggsPipe,
    DateArrPipe
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ValuesPipe,
    AggsPipe,
    DateArrPipe,
    Ng2CompleterModule
  ]
})
export class SharedModule { }
