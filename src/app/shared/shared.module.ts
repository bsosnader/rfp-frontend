import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ValuesPipe } from './values.pipe';
import { AggsPipe } from './aggs.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    ValuesPipe,
    AggsPipe
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ValuesPipe,
    AggsPipe
  ]
})
export class SharedModule { }
