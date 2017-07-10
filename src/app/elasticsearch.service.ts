import { Injectable } from '@angular/core';

import { Client } from 'elasticsearch';


@Injectable()
export class ElasticsearchService {
  private _client: Client;
  readonly host = 'https://localhost:9200';
  readonly index = "rfps2";
  readonly type = "rfp2";

  constructor() {
    if (!this._client) this._connect();
  }

  private _connect() {
    this._client = new Client({
      host: this.host,
      log: 'trace'
    })
  }

  //method to search, with optional array of filters passed
  getData(value: string, textFields: String[], highlightFields: Object, filters: Object[]): Promise<any> {
    /*create array of user inputted values for filters then use them in filter, if it's empty, nothing is filtered
      per elasticsearch Query DSL, filters should be like so: {term: {filter: "input"}}, ...
      highlightFields should be : {field: {}}, ...
      textFields is just strings
      */
    return this._client.search({
      index: this.index,
      type: this.type,
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

  //bulk index data
  putBulk(body: Object[]): Promise<any> {
    return this._client.bulk({
      index: this.index,
      type: this.type,
      body: body
    })
  }

  //method to get mapping of an index and type
  getMapping(): Promise<any> {
    return this._client.indices.getMapping({
      index: this.index,
      type: this.type
    })
  }
  /*method to get mapping of particular fields of an index and type
    fields should be like this: ["a", "b", "c"]
  */
  getFieldMapping(fields: string[]): Promise<any> {
    return this._client.indices.getFieldMapping({
      index: this.index,
      type: this.type,
      fields: fields
    })
  }

  /*method to get all values of specific fields
    per elasticsearch Query DSL, fields should look like:
    names: { terms: { field: name }},
    otherNames: {terms: { field: otherName }}, etc...
    */
  getAggs(fields: Object): Promise<any> {
    return this._client.search({
      index: this.index,
      type: this.type,
      body: {
        size: 0,
        aggs: fields
      }
    })
  }

  /*delete all entries with field values matching the passed field values
  as above, fields should be formatted like so: {term: {field: "input"}}, ... */
  deleteByFields(fields: Object[]): Promise<any> {
    return this._client.deleteByQuery({
      index: this.index,
      type: this.type,
      body: {
        query: {
          bool: {
            filter: fields
          }
        }
      }
    })
  }

  /*get aggs based on specific field values. used for when we need to get all dates
  submitted for a specific filename.
  filters: {term:{filterName:filterValue}}, ...
  aggs: {fieldName:{terms:{field:fieldName}}}, ...
  */
  getAggsByField(filters: Object[], fields: Object): Promise<any> {
    return this._client.search({
      index: this.index,
      type: this.type,
      body: {
        query: {
          bool: {
            filter: filters
          }
        },
        aggs: fields
      }
    })
  }
}

/* need to start with this mapping because all future fields will be added as keywords
"properties": {
  "timestamp": {
    "type": "date"
  },
  "date": {
    "type": "date"
  },
  "body": {
    "type": "text"
  },
  "question": {
    "type":"text"
  },
  "heading": {
    "type":"text"
  },
  "headingOne": {
    "type": "text"
  },
  "headingTwo": {
    "type":"text"
  }
}
*/
