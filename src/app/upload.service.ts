import { Injectable } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { Http } from '@angular/http'; //I *thought* that importing the shared module meant I didn't have to do this, but ¯\_(ツ)_/¯

import { Observable } from 'rxjs/Rx';

//need to explicitly import RxJs methods
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UploadService {

  constructor(private http: Http) { }

  private apiURL = 'http://localhost:8888/servlet';


  getResponse() : Promise<any> {
    return this.http.get(this.apiURL)
               .toPromise()
              //  .then(response => response.json().data)
              //  .catch(this.handleError);
              //I realized that this is just supposed to return the promise and not
              //worry about anything else like 'then' and 'catch'
  }

  /**private extractData(res : Response) {
    let body = res.json();
    return body.data || {};
  }*/

  //probably not needed
  private handleError(error: any) : Promise<any> {
    console.error('HEY HEY An error occurred', error) //TODO remove this
    return Promise.reject(error.message || error)
  }

}
