import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UploadService} from '../upload.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { rfpDocument } from './rfp.interface';
import { ElasticsearchService } from '../elasticsearch.service';
import { UploadFormComponent } from './upload-form/upload-form.component';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild(UploadFormComponent)
  private uploadFormComponent: UploadFormComponent;
  response;
  responsebody;
  bulkRequestResponseResult;

  docResult: rfpDocument;

  /* the form is now in the upload-form component, which returns a "rfpDocument" object
  you can access it using docResult, and if you look in "rfp.interface.ts", you'll see the structure of
  the object and what you can access. the actual file is also included in this object.*/


  ngOnInit() {  }

  constructor(private uploadService : UploadService, private elasticService: ElasticsearchService){}

  onSubmit(doc: rfpDocument) {
    this.docResult = doc;
    this.postRequest();
  }

  onYes(){
    console.log("You said yes!");
    let test = JSON.parse(this.response._body);
    this.bulkRequest(test.stuff);
    this.response = undefined;
    this.responsebody = undefined;
    this.docResult = undefined;
    this.uploadFormComponent.myForm.reset();
    this.uploadFormComponent.fileInputReset();

  }

  onNo(){
    console.log("You said no!");
    this.response = undefined;
    this.responsebody = undefined;
    this.docResult = undefined;
    //this.uploadFormComponent.ngOnInit();  <== i think this would also work instead of myForm.reset()
    this.uploadFormComponent.myForm.reset();
    this.uploadFormComponent.fileInputReset();
  }

  getRequest(): void {
    this.uploadService.getRequest()
      .then((resp) => {
        this.response = resp;
      }).catch((err) => {
        console.error(err);
      });

  }

  postRequest() : void {
    let formData = new FormData();
    formData.append('file', this.docResult.companyDoc);
    formData.append('tags', JSON.stringify(this.docResult));
    this.uploadService.postRequest(formData)
        .then((resp) => {
          this.response = resp;
          this.responsebody = JSON.parse(resp._body);
        }).catch((err) => {
          console.error(err);
        })

  }

  bulkRequest(body: Object[]) {
    this.elasticService.putBulk(body)
      .then((resp) => {
        if (!resp.errors) {
          this.bulkRequestResponseResult = "Success!";
        } else {
          this.bulkRequestResponseResult = "There was an error";
        }
        setTimeout(() => {
          this.uploadFormComponent.getAggsForUpload(this.uploadFormComponent.aggsObject);
        },5000); //when we post to ES we want to get new aggs for autocomplete, but we have to wait a bit for them to get indexed
      }).catch((err) => {
        console.error(err);
      })
  }

}
