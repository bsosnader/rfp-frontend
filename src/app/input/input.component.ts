import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  value= '';
  onEnter(value: string) { this.value = value; }

  
  constructor() { }

  ngOnInit() {
  }

}
