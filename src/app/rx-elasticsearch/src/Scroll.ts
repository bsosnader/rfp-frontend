import {Scrollable} from './Scrollable';
import {Observable} from '@reactivex/rxjs';
import * as Elasticsearch from 'elasticsearch';

export class Scroll implements Scrollable {

    public static scroll<T>(params:Elasticsearch.SearchParams, client:Elasticsearch.Client):Observable<T> {

        let searchPromise = <Promise<T>>client
            .search(params);

        let obs = Observable
            .fromPromise(searchPromise)
            .expand((response:any) => {
                    if (response.hits.hits.length === 0) return Observable.empty<T>();
                    return Observable.fromPromise(<Promise<T>>client.scroll({
                            scrollId: response._scroll_id,
                            scroll: params.scroll
                        }
                    ));
                }
            );

        let published = obs.publish();
        this.clearScroll(published, client);
        published.connect();

        return published;
    }

    private static clearScroll(published, client) {
        published
            .last()
            .subscribe((response:any) => client.clearScroll({
                scrollId: response._scroll_id
            }));
    }
}
