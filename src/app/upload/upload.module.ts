import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [UploadComponent]
})
export class UploadModule { }
