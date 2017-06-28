import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { Ng2CompleterModule } from 'ng2-completer';
import { DeleteComponent } from './delete.component';



@NgModule({
  imports: [
    SharedModule,
    Ng2CompleterModule
  ],
  declarations: [DeleteComponent]
})
export class DeleteModule { }
