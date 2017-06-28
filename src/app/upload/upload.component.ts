import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UploadService} from '../upload.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { rfpDocument } from './rfp.interface';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  response; //object not promise
  responsebody;


  docResult: rfpDocument;

  /* the form is now in the upload-form component, which returns a "rfpDocument" object
  you can access it using docResult, and if you look in "rfp.interface.ts", you'll see the structure of
  the object and what you can access. the actual file is also included in this object.*/

  //to actually get all of this to the java server will be a little more complicated
  //from what I read, we'll have to send the file and metadata separately and then link them together
  //on the java side of things. still looking into it.

  ngOnInit() {
    //this.postRequest(); //response will be logged at start of app!
  }

  constructor(private uploadService : UploadService){}

  onSubmit(doc: rfpDocument) {
    this.docResult = doc;
    console.log(this.docResult);
    console.log("hi");
    this.postRequest();
  }

  getRequest(): void {
    this.uploadService.getRequest()
      .then((resp) => {
        this.response = resp;
        console.log(); //woo we get a response!!
      }).catch((err) => {
        console.error(err);
      });

  }

  postRequest() : void {
    var obj = JSON.parse('{"name":"larry","type":"libra","age":"22"}');
    let formData = new FormData();
    formData.append('file', this.docResult.companyDoc);
    formData.append('tags', JSON.stringify(this.docResult));
    this.uploadService.postRequest(formData)
        .then((resp) => {
          this.response = resp;
          console.log(resp);
          this.responsebody = JSON.parse(resp._body);
          console.log(JSON.parse(this.response._body));
        }).catch((err) => {
          console.error(err);
        })

  }
}
