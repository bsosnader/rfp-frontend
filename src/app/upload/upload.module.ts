import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UploadService} from '../upload.service';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UploadComponent],
  providers: [UploadService]
})
export class UploadModule { }
