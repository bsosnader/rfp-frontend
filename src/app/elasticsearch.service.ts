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

  constructor() {
    if (!this._client) this._connect();
  }

  private _connect() {
    this._client = new Client({
      host: 'https://search-elastic-test-yyco5dncwicwd2nufqhakzek2e.us-east-1.es.amazonaws.com/',
      log: 'trace'
    })
    this._rxClient = new RxClient(this._client);
  }

  getData(value) {

    return this._rxClient.search({
      index: 'rfps2',
      type: 'rfp2',
      body: {
        query: {
          bool: {
            must: [
              { match: {
                body: {
                  query:value,
                  operator:"and"
                }

              }}
            ],
            filter: [
              {range:{date:{gte:"2017-05-31"}}},
              {
                term:
                {
                  type: "Life Sciences"
                }

              }
            ]
          }
        }
      }
    })
      .catch(this.handleError);
  }

  getFields() {
    return this._client.indices.getMapping({
      index: 'rfps2',
      type: 'rfp2'
    })
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
