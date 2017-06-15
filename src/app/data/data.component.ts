import { Component, OnInit} from '@angular/core';

import { ElasticsearchService } from '../elasticsearch.service';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  value = '';
  results: Object[];
  mappings;
  filters: String[];
  filtered;
  dateModel;
  useFilter: boolean;

  doIt(value: string) {
    this.value = value
    if (this.dateModel) {
      var month;
      var day;
      if (this.dateModel.month < 10) {
        month = "0" + this.dateModel.month;
      } else {
        month = this.dateModel.month;
      }
      if (this.dateModel.day < 10) {
        day = "0" + this.dateModel.day;
      } else {
        day = this.dateModel.day;
      }
      this.filtered["date"] = {range: {date: {gte:""+this.dateModel.year + "-" + month + "-" + day}}}
    }
    if (this.useFilter) {
      this.getSearch("rfps2", "rfp2", this.value, Object.keys(this.filtered).map((key) => {
        if (this.filtered[key].term[key] != ''){
          return this.filtered[key];
        }
      }).filter((n) => {return n != undefined}));
    } else {
      this.getSearch("rfps2", "rfp2", this.value);
    }

  };



  constructor(private dataService: ElasticsearchService, dateConfig: NgbDatepickerConfig) {
    this.filters = [];
    this.filtered = [];
    this.useFilter = false;
    var today = new Date();
    dateConfig.maxDate = {year:today.getFullYear(), day:today.getDate(), month:(today.getMonth()+1)};
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
            if(this.mappings[key].type == "keyword") {
              this.filters.push(key);
              this.filtered[key] = {term: {[key]: ''}};
            }
          }
        }
      }).catch((err) => {
        console.error(err);
      })
  }


}
