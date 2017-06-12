"use strict";
var rxjs_1 = require('@reactivex/rxjs');
var Search = (function () {
    function Search() {
    }
    Search.search = function (params, client) {
        return rxjs_1.Observable.fromPromise(client.search(params));
    };
    return Search;
}());
exports.Search = Search;
//# sourceMappingURL=/Users/ralph/IdeaProjects/enhanced-elasticsearch/src/Search.js.map