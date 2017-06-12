import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, SearchResponse } from 'elasticsearch';



@Injectable()
export class ElasticsearchService {
  private _client: Client;

  constructor() {
    if (!this._client) this._connect();
  }

  private _connect() {
    this._client = new Client({
      host: 'https://search-elastic-test-yyco5dncwicwd2nufqhakzek2e.us-east-1.es.amazonaws.com/',
      log: 'trace'
    })
  }

  search(value): any {
    if (value) {
      console.log(value)
      return this._client.search({
        index: 'rfps',
        q: `title:${value}`
      })
    } else {
      return Promise.resolve({})
    }
  }

}
