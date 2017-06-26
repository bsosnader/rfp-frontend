import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../elasticsearch.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  response;
  deleteId = "company";
  aggObject = {};
  selection;

  constructor(private elasticService: ElasticsearchService) { }

  ngOnInit() {
    this.aggObject[this.deleteId] = {terms: {field: this.deleteId}}
    this.getNames("rfps2", "rfp2", this.aggObject);
  }

  getNames(index: string, type: string, fields: Object) {
    this.elasticService.getAggs(index, type, fields)
      .then((data) => {
        this.response = data;
      }).catch((err) => {
        console.error(err);
      })
  }

  doDelete(index: string, type: string) {
    let deleteObject = [{term: {[this.deleteId]: this.selection}}];

    this.elasticService.deleteByFields(index, type, deleteObject);
  }

}
