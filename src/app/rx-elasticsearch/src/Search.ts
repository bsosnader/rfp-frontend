import {Observable} from '@reactivex/rxjs';
import * as Elasticsearch from 'elasticsearch';

export class Search {

    public static search<T>(params:Elasticsearch.SearchParams, client:Elasticsearch.Client):Observable<T> {
        return Observable.fromPromise<T>(<Promise<T>>client.search(params));
    }
}
