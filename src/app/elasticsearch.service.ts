import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import RxClient from './rx-elasticsearch/RxClient';
import { Client, SearchResponse } from 'elasticsearch';
import { Data } from './data';



@Injectable()
export class ElasticsearchService {
  private _client: Client;
  private _rxClient: RxClient;
  hits: Data[];

  constructor() {
    if (!this._client) this._connect();
  }

  private _connect() {
    this._client = new Client({
      host: 'https://search-elastic-test-yyco5dncwicwd2nufqhakzek2e.us-east-1.es.amazonaws.com/',
      log: 'trace'
    })
  }

  getData(value: string): Promise<any> {
    var test = [{term: {type: "Life Sciences"}}];
    //create array of user inputted values for filters then use them in filter
    return this._client.search({
      index: "rfps2",
      type: "rfp2",
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  body: value
                }
              }
            ],
            filter: test
          }
        }
      }
    })
  }

  getMapping(): Promise<any> {
    return this._client.indices.getMapping({
      index: "rfps2",
      type: "rfp2"
    })
  }

  getFieldMapping(): Promise<any> {
    return this._client.indices.getFieldMapping({
      index:"rfps2",
      fields: ["company"]
    })
  }
}
