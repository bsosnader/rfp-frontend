import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { UploadComponent } from './upload.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UploadService} from '../upload.service';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadTagComponent } from './upload-tag/upload-tag.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [UploadComponent, UploadFormComponent, UploadTagComponent],
  providers: [UploadService]
})
export class UploadModule { }
