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
    this.getSearch(this.value);
  };
  errorMessage: string;
  results: Data[];
  mappings;
  filters: String[];
  mode = 'Observable';

  constructor(private dataService: ElasticsearchService) {
    this.filters = [];
   }

  ngOnInit() {
    this.getFilterableFields();
  }

  getSearch(v: string) {
    this.dataService.getData(v)
    .then((data) => {
      this.results = data.hits.hits
    }).catch((err) => {
      console.error(err)
    })
  }

  getFilterableFields() {
    this.dataService.getMapping()
      .then((data) => {
        this.mappings = data.rfps2.mappings.rfp2.properties
        for (var key in this.mappings) {
          if (this.mappings.hasOwnProperty(key)) {
            if(this.mappings[key].type == "keyword" || this.mappings[key].type == "date") {
              this.filters.push(key);
            }
          }
        }
        console.log(this.mappings);
      }).catch((err) => {
        console.error(err);
      })
  }

}
