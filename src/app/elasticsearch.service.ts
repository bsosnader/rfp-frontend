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

  getData(value): Promise<Data[]> {
    return this._client.search({
      index: 'rfps2',
      type: 'rfp2',
      body: {
        query: {
          match: {
            body: value
          }
        }
      }
    }).catch((err) => {
      console.error(err);
    })
  }
}
