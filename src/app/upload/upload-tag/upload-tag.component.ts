import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-tag',
  templateUrl: './upload-tag.component.html',
  styleUrls: ['./upload-tag.component.css']
})
export class UploadTagComponent {

  @Input('group')
  public tagForm: FormGroup;


}
