import { Component, OnInit} from '@angular/core';

import { ElasticsearchService } from '../elasticsearch.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  value = '';
  x = [{term: {type: "Life Sciences"}}, {term: {company: "Tesaro"}}];
  doIt(value: string) {
    this.value = value
    this.getSearch("rfps2", "rfp2", this.value);
  };

  results: Object[];
  mappings;
  filters: String[];
  filtered;

  constructor(private dataService: ElasticsearchService) {
    this.filters = [];
    this.filtered = new Object;
   }

  ngOnInit() {
    this.getFilterableFields("rfps2", "rfp2");

  }

  //method to search, passes along parameters to elasticsearch service
  getSearch(index: string, type: string, value: string, filters: Object[] = null) {
    if (filters == null) {
      this.dataService.getData("rfps2", "rfp2", value)
      .then((data) => {
        this.results = data.hits.hits;
      }).catch((err) => {
        console.error(err)
      })
    } else {
      this.dataService.getData("rfps2", "rfp2", value, filters)
      .then((data) => {
        this.results = data.hits.hits
      }).catch((err) => {
        console.error(err)
      })
    }

  }

  //method to get fields that are filterable, e.g. date or keywords.
  getFilterableFields(index: string, type: string) {
    this.dataService.getMapping(index, type)
      .then((data) => {
        var str = index+".mappings."+type+".properties";
        this.mappings = str.split('.').reduce((a, b) => a[b], data); //accesses object properties using a string
        for (let key in this.mappings) {
          if (this.mappings.hasOwnProperty(key)) { //ensures proto stuff doesn't get used
            if(this.mappings[key].type == "keyword" || this.mappings[key].type == "date") {
              this.filters.push(key);
              this.filtered[key] = {type: {[key]: ''}};
            }
          }
        }
      }).catch((err) => {
        console.error(err);
      })
  }


}
