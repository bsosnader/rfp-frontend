import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '../data';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  errorMessage: string;
  results: Data[];
  mode = 'Observable';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getData()
      .subscribe(
        results => this.results = results,
        error => this.errorMessage = <any>error
      );
  }

}
