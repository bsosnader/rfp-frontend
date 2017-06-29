import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ValuesPipe } from './values.pipe';
import { AggsPipe } from './aggs.pipe';
import { DateArrPipe } from './date-arr.pipe';
import { Ng2CompleterModule } from 'ng2-completer';
import { CamelPipe } from './camel.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ValuesPipe,
    AggsPipe,
    DateArrPipe,
    CamelPipe
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ValuesPipe,
    AggsPipe,
    DateArrPipe,
    CamelPipe,
    Ng2CompleterModule
  ]
})
export class SharedModule { }
