import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DeleteComponent } from './delete.component';



@NgModule({
  imports: [
    SharedModule
    ],
  declarations: [DeleteComponent]
})
export class DeleteModule { }
