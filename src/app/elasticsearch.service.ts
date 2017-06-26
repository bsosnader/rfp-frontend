import { Injectable } from '@angular/core';

import { Client } from 'elasticsearch';


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
  getData(index: string, type: string, value: string, textFields: String[], highlightFields: Object, filters: Object[]): Promise<any> {
    /*create array of user inputted values for filters then use them in filter, if it's empty, nothing is filtered
      per elasticsearch Query DSL, filters should be like so: {term: {filter: "input"}}, ...
      highlightFields should be : {field: {}}, ...
      textFields is just strings
      */
    return this._client.search({
      index: index,
      type: type,
      body: {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query: value,
                  fields: textFields
                }
              }
            ],
            filter: filters
          }
        },
        highlight: {
          fields: highlightFields
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
  /*method to get mapping of particular fields of an index and type
    fields should be like this: ["a", "b", "c"]
  */
  getFieldMapping(index: string, type: string, fields: string[]): Promise<any> {
    return this._client.indices.getFieldMapping({
      index:index,
      type: type,
      fields: fields
    })
  }

  /*method to get all values of specific fields
    per elasticsearch Query DSL, fields should look like:
    names: { terms: { field: name }},
    otherNames: {terms: { field: otherName }}, etc...
    */
  getAggs(index: string, type: string, fields: Object): Promise<any> {
    return this._client.search({
      index: index,
      type: type,
      body: {
        size: 0,
        aggs: fields
      }
    })
  }

  /*delete all entries with field values matching the passed field values
  as above, fields should be formatted like so: {term: {field: "input"}}, ... */
  deleteByFields(index: string, type: string, fields: Object[]): Promise<any> {
    return this._client.deleteByQuery({
      index: index,
      body: {
        query: {
          bool: {
            filter: fields
          }
        }
      }
    })
  }
}
