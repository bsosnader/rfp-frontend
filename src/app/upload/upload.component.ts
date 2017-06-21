import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UploadService} from '../upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  response: Promise<any>;

  compname: String;
  comptype: String;
  compdoc: String;

  public uploadForm = this.fb.group({
    companyname: ["", Validators.required],
    companytype: ["",Validators.required],
    companydoc: ["",Validators.required]
  });

  getResponse(): void {
    this.response = this.uploadService.getResponse();

    console.log(this.response.then(JSON.parse)); //THIS  DOESN'T DO ANYTHING USEFUL
    //THIS IS WHERE I LEFT OFF YESTERDAY
    //this.uploadService
        //.getResponse()
        //.then(response => this.response = response);
        //console.log(this.response);
  }

  constructor(public fb: FormBuilder,   private uploadService : UploadService){}
  doUpload(event) {
    console.log(event);
    console.log(this.uploadForm.value);
    this.compname = this.uploadForm.controls.companyname.value;
    this.comptype = this.uploadForm.controls.companytype.value;
    this.compdoc = this.uploadForm.controls.companydoc.value;
    this.getResponse();
  }
}
