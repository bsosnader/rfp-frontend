import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { elasticsearch } from 'elasticsearch-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Data } from './data';

@Injectable()
export class DataService {
  private dataUrl = 'http://search-elastic-test-yyco5dncwicwd2nufqhakzek2e.us-east-1.es.amazonaws.com/rfps/rfp/_search';


  constructor(private http: Http) { }

  getData(): Observable<Data[]> {
    return this.http.get(this.dataUrl)
      .map(this.extractData)
      .catch(this.handleError);
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
