"use strict";
var rxjs_1 = require('@reactivex/rxjs');
var Scroll = (function () {
    function Scroll() {
    }
    Scroll.scroll = function (params, client) {
        var searchPromise = client
            .search(params);
        var obs = rxjs_1.Observable
            .fromPromise(searchPromise)
            .expand(function (response) {
            if (response.hits.hits.length === 0)
                return rxjs_1.Observable.empty();
            return rxjs_1.Observable.fromPromise(client.scroll({
                scrollId: response._scroll_id,
                scroll: params.scroll
            }));
        });
        var published = obs.publish();
        this.clearScroll(published, client);
        published.connect();
        return published;
    };
    Scroll.clearScroll = function (published, client) {
        published
            .last()
            .subscribe(function (response) { return client.clearScroll({
            scrollId: response._scroll_id
        }); });
    };
    return Scroll;
}());
exports.Scroll = Scroll;
//# sourceMappingURL=/Users/ralph/IdeaProjects/enhanced-elasticsearch/src/Scroll.js.map