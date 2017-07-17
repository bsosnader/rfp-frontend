import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { ElasticsearchService } from '../../elasticsearch.service';
import { rfpDocument } from '../rfp.interface';



@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  public myForm: FormGroup;
  formResults: rfpDocument;
  @Output() onSubmit = new EventEmitter<rfpDocument>();
  companyAggs = [];
  typeAggs = [];
  serviceAggs = [];
  useHighlighting = true;

  @ViewChild('fileInput')
  myInputVariable: any;

  constructor(private _fb: FormBuilder, private eServe: ElasticsearchService) { }

  ngOnInit() {
    //initialize form here
    this.myForm = this._fb.group({
      companyDoc: ['', [Validators.required]],
      companyName: ['',[Validators.required]],
      date: ['', [Validators.required]],
      companyType: ['',[Validators.required]],
      service: ['',[Validators.required]],
      additionalTags: this._fb.array([

      ])

    });
    let aggsObject = {};
    aggsObject["company"] = {terms: {field: "companyName"}};
    aggsObject["type"] = {terms: {field: "companyType"}};
    aggsObject["service"] = {terms: {field:"service"}};
    this.getAggsForUpload(aggsObject)
  }

  fileInputReset() {
    this.myInputVariable.nativeElement.value = "";
  }

  initTag() {
    //initialize our tag
    return this._fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  addTag() {
    //add tag to list
    const control = <FormArray>this.myForm.controls['additionalTags'];
    control.push(this.initTag());
  }

  removeTag(i: number) {
    //remove tag from list
    const control = <FormArray>this.myForm.controls['additionalTags'];
    control.removeAt(i);
  }

  save(model: FormGroup) {
    //call API to save rfpDocument

    if(model.valid) {
      this.formResults = model.value;
      let d = new Date();
      this.formResults["timestamp"] = d.getTime();
      this.formResults["filename"] = this.formResults.companyDoc.name;
      this.formResults["useHighlighting"] = this.useHighlighting;
      this.onSubmit.emit(this.formResults);
    }

  }

  //when event is triggered by user choosing a file, takes that file and puts it in the form
  fileUploaded(event: any) {
    const file = event.srcElement.files[0];
    this.myForm.get('companyDoc').patchValue(file);
  }

  //method to get values for keywords for use in autocomplete feature
  getAggsForUpload(aggs: Object) {
    this.eServe.getAggs(aggs)
      .then((data) => { //I *have* a really great aggs pipe that would do this for me in the html but it bizarrely and severely breaks routing so ...
        for (let x of data.aggregations.company.buckets) { //company, service, type will all have to TODO be changed in final release, to proabaly companyName, companyType, and service will be changed to something else.
          this.companyAggs.push(x.key)
        }
        for (let x of data.aggregations.service.buckets) {
          this.serviceAggs.push(x.key)
        }
        for (let x of data.aggregations.type.buckets) {
          this.typeAggs.push(x.key)
        }
      }).catch((err) => {
        console.error(err);
      })
  }

  getTagsControls(form) {
    return form.get('additionalTags').controls;
  }

}
