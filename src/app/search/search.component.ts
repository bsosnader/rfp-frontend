import { Component, OnInit} from '@angular/core';
import { JsonPipe } from '@angular/common';

import { ElasticsearchService } from '../elasticsearch.service';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  value = '';
  results: Object[];
  mappings;
  filters: String[];
  textFields: String[];
  highlightFields;
  aggsFields = {};
  aggsResults;
  filtered;
  dateModel;
  useFilter: boolean;
  index = "rfps2";
  type = "rfp2";

  constructor(private elasticSearchService: ElasticsearchService, dateConfig: NgbDatepickerConfig) {
    this.filters = [];
    this.textFields = [];
    this.filtered = [];
    this.highlightFields = [];
    this.useFilter = false;

    //limits cal to today and earlier. sidenote- why the hell does js count months from 0??
    var today = new Date();
    dateConfig.maxDate = {year:today.getFullYear(), day:today.getDate(), month:(today.getMonth()+1)};
   }

  ngOnInit() {
    this.getFilterableFields(this.index, this.type);
  }

  //performs search on event, uses elasticsearch service
  searchPress(value: string) {
    this.value = value

    console.log(new JsonPipe().transform(this.aggsFields));
    this.getAggs(this.index, this.type, this.aggsFields);

    var nonBlankFilters = Object.keys(this.filtered).map((key) => {
      if (this.filtered[key].term[key] != ''){
        return this.filtered[key];
      }
    }).filter((n) => {return n != undefined}); /*messy way of ensuring blank filters don't get passed to search
                                                 there's probably a better way to do this (and to do everything else)
                                                 but I don't know it, so, sorry about that */
    this.getDate(nonBlankFilters);
    if (!this.useFilter) { nonBlankFilters = []}; //there's a better way to set this up!!
    this.elasticSearchService.getData(this.index, this.type, value, this.textFields, this.highlightFields, nonBlankFilters)
    .then((data) => {
      this.results = data.hits.hits
    }).catch((err) => {
      console.error(err)
    })

  }


  /*this just gets the inputted date and converts it to proper format, then adds
  it to an array of filters. yay for pass by value (even if it's just a reference 'value')*/
  getDate(filters: Object[]) {
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
      // elasticsearch query format to get all results on or after this date (gte: >=)
      filters.push({range: {date: {gte:""+this.dateModel.year + "-" + month + "-" + day}}});
    }
  }

  //method to get keywords that can be filtered and text that can be searched
  getFilterableFields(index: string, type: string) { //TODO change name
    this.elasticSearchService.getMapping(index, type)
      .then((data) => {
        var str = index+".mappings."+type+".properties";
        this.mappings = str.split('.').reduce((a, b) => a[b], data); //accesses object properties using a string
        for (let key in this.mappings) {
          if (this.mappings.hasOwnProperty(key)) { //ensures proto stuff doesn't get used
            if(this.mappings[key].type == "keyword") {
              this.filters.push(key);
              this.filtered[key] = {term: {[key]: ''}}; /*this isn't an array because we want to be able to know
                                                        the keys so it's easy to fill them with user data.
                                                        Since there's an indeterminate amount of keywords,
                                                        and we won't know the order, need to have this context*/
              this.aggsFields[key] = {terms: { field: key } };
            } else if (this.mappings[key].type == "text") {
              this.textFields.push(key);
              this.highlightFields.push({[key]: {}});
            }
          }
        }
      }).then((d) => {
        this.getAggs(index, type, this.aggsFields) //I have no idea how async and promise stuff works :(
      }).catch((err) => {
        console.error(err);
      })
  }

  //method to get values for keywords for use in autocomplete feature
  getAggs(index: string, type: string, agf: Object) {
    this.elasticSearchService.getAggs(index, type, agf)
      .then((data) => {
        this.aggsResults = data;
      }).catch((err) => {
        console.error(err);
      })
  }


}
