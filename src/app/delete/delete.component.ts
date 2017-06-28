import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../elasticsearch.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  nameResponse;
  dateResponse;
  deleteResponse;
  deleteId = "filename";
  dateId = "timestamp";
  nameAggObject = {};
  dateAggObject = {};
  nameSelection;
  dateSelection;


  constructor(private elasticService: ElasticsearchService) { }

  ngOnInit() {
    this.nameAggObject[this.deleteId] = {terms: {field: this.deleteId}};
    this.dateAggObject[this.dateId] = {terms: {field: this.dateId}};

    this.getNames(this.nameAggObject);
  }

  getNames(fields: Object) {
    this.elasticService.getAggs(fields)
      .then((data) => {
        this.nameResponse = data;
      }).catch((err) => {
        console.error(err);
      })
  }

  getDates(filters: Object[], fields: Object) {
    this.elasticService.getAggsByField(filters, fields)
      .then((data) => {
        this.dateResponse = data;
        console.log(this.dateResponse);
      }).catch((err) => {
        console.error(err);
      })
  }

  onNameSelect() {
    let filterObject = [{term:{[this.deleteId]: this.nameSelection}}];

    this.getDates(filterObject, this.dateAggObject);
  }

  doDelete() {
    let deleteObject = [{term: {[this.deleteId]: this.nameSelection}},
                        {term: {[this.dateId]: this.dateSelection}}];

    this.elasticService.deleteByFields(deleteObject)
      .then((response) => {
        this.deleteResponse = response;
        console.log(this.deleteResponse);
      }).catch((err) => {
        console.error(err);
      })
  }

}
