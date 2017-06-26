import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    //initialize form here
    this.myForm = this._fb.group({
      companyDoc: ['', [Validators.required]],
      companyName: ['',[Validators.required]],
      dateSubmitted: ['', [Validators.required]],
      companyType: ['',[Validators.required]],
      service: ['',[Validators.required]],
      additionalTags: this._fb.array([

      ])

    });
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
      this.onSubmit.emit(this.formResults);
    }

  }

  //when event is triggered by user choosing a file, takes that file and puts it in the form
  fileUploaded(event: any) {
    const file = event.srcElement.files[0];
    this.myForm.get('companyDoc').patchValue(file);
  }


}
