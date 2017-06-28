import { Component, OnInit, Input } from '@angular/core';

//CREATE METHODS FOR YES AND NO BUTTONS
//CONNECT WITH UPLOAD COMPONENT

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() responsebody: any;

  constructor() { }

  ngOnInit() {
    console.log(this.responsebody.stuff);
  }

}
