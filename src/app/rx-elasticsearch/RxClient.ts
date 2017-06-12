import {Scroll} from './src/Scroll';
import {Search} from './src/Search';
import * as Elasticsearch from 'elasticsearch';
import {Observable} from '@reactivex/rxjs';

export default class RxClient {

    private client:Elasticsearch.Client;

    constructor(client:Elasticsearch.Client) {
        this.client = client;
    }

    static create(config:Elasticsearch.ConfigOptions):RxClient {
        return this.constructor(new Elasticsearch.Client(config));
    }

    public scroll<T>(params:Elasticsearch.SearchParams):Observable<T> {
        return Scroll.scroll<T>(params, this.client);
    }

    public search<T>(params:Elasticsearch.SearchParams):Observable<T> {
        return Search.search<T>(params, this.client);
    }

    public getClient():Elasticsearch.Client {
        return this.client;
    }
}
