import { Component, OnInit, Input } from '@angular/core';
import { ElasticsearchService } from '../elasticsearch.service';
import { Data } from '../data';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  value = '';
  onEnter(value: string) {
    this.value = value
    this.getData(this.value);
  };
  errorMessage: string;
  results: Data[];
  mode = 'Observable';

  constructor(private dataService: ElasticsearchService) { }

  ngOnInit() {
    //this.getData(this.value);
  }

  getData(v: string) {
    this.dataService.getData(v)
      .subscribe(
        results => this.results = results,
        error => this.errorMessage = <any>error
      );
  }

}
