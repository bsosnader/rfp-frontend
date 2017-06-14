import { Injectable } from '@angular/core';

import { Client } from 'elasticsearch';


//class for connecting to and querying an elasticsearch instance
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

  //method to search, with optional array of filters passed
  getData(index: string, type: string, value: string, filters: Object[] = null): Promise<any> {
    //create array of user inputted values for filters then use them in filter

    if (filters == null)
    {
      return this._client.search({
        index: index,
        type: type,
        body: {
          query: {
            match: {
              body: value
            }
          },
          highlight: {
            fields: {
              body:{}
            }
          }
        }
      })
    }
    return this._client.search({
      index: index,
      type: type,
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
            filter: filters
          }
        }
      }
    })
  }

  //method to get mapping of an index and type
  getMapping(index: string, type: string): Promise<any> {
    return this._client.indices.getMapping({
      index: index,
      type: type
    })
  }
  //method to get mapping of particular fields of an index and type
  getFieldMapping(index: string, type: string, fields: string[]): Promise<any> {
    return this._client.indices.getFieldMapping({
      index:index,
      type: type,
      fields: fields
    })
  }
}
