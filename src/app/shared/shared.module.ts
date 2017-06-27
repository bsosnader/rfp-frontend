import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ValuesPipe } from './values.pipe';
import { AggsPipe } from './aggs.pipe';
import { DateArrPipe } from './date-arr.pipe';

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
    DateArrPipe
  ]
})
export class SharedModule { }
