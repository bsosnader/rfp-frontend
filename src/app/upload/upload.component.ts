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

  response: Object; //object not promise

  testo: rfpDocument;

  compname: String;
  comptype: String;
  compdoc: String;
  date = {};

  public uploadForm = this.fb.group({
    companyname: ["", Validators.required],
    companytype: ["",Validators.required],
    companydoc: ["",Validators.required],
    companydate: [{day: 0, month: 0, year: 0},Validators.required]
  });

  getResponse(): void {
    //this.response = this.uploadService.getResponse();

    //console.log(this.response.then(JSON.parse)); //THIS  DOESN'T DO ANYTHING USEFUL
    //THIS IS WHERE I LEFT OFF YESTERDAY
    //this.uploadService
        //.getResponse()
        //.then(response => this.response = response);
        //console.log(this.response);
    this.uploadService.getResponse()
      .then((resp) => {
        this.response = resp;
        console.log(this.response); //woo we get a response!!
      }).catch((err) => {
        console.error(err);
      });
  }


  ngOnInit() {
    this.getResponse(); //response will be logged at start of app!

    let today = new Date();
    this.dateConfig.maxDate = {year:today.getFullYear(), day:today.getDate(), month:(today.getMonth()+1)};
  }

  constructor(public fb: FormBuilder,   private uploadService : UploadService, private dateConfig: NgbDatepickerConfig){}

  doUpload(event) {
    console.log(event);
    console.log(this.uploadForm.value);
    this.compname = this.uploadForm.controls.companyname.value;
    this.comptype = this.uploadForm.controls.companytype.value;
    this.compdoc = this.uploadForm.controls.companydoc.value;

    this.date["day"] = this.uploadForm.controls.companydate.value.day;
    this.date["month"] = this.uploadForm.controls.companydate.value.month;
    this.date["year"]= this.uploadForm.controls.companydate.value.year;
    this.getResponse();
  }

  onSubmit(doc: rfpDocument) {
    this.testo = doc;
    console.log(this.testo);
    console.log("hi")
  }
}
