"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = /** @class */ (function () {
    function Cache(scripts) {
        var self = this;
        Object.keys(scripts).forEach(function (key) {
            var script = scripts[key];
            self[key] = {
                tag: Cache._scriptTag(key, script),
                onLoad: Cache._onLoad(key)
            };
        });
    }
    Cache._onLoad = function (key) {
        return function (cb) {
            var stored = Cache.scriptMap.get(key);
            if (stored) {
                stored.promise.then(function () {
                    stored.error ? cb(stored.error) : cb(null, stored);
                });
            }
            else {
                // TODO:
            }
        };
    };
    ;
    Cache._scriptTag = function (key, src) {
        if (!Cache.scriptMap.has(key)) {
            var tag_1 = document.createElement('script');
            var promise = new Promise(function (resolve, reject) {
                var resolved = false, errored = false, body = document.getElementsByTagName('body')[0];
                tag_1.type = 'text/javascript';
                tag_1.async = false; // Load in order
                var cbName = "loaderCB" + Cache.counter++ + Date.now();
                var cb;
                var handleResult = function (state) {
                    return function (evt) {
                        var stored = Cache.scriptMap.get(key);
                        if (state === 'loaded') {
                            stored.resolved = true;
                            resolve(src);
                            // stored.handlers.forEach(h => h.call(null, stored))
                            // stored.handlers = []
                        }
                        else if (state === 'error') {
                            stored.errored = true;
                            // stored.handlers.forEach(h => h.call(null, stored))
                            // stored.handlers = [];
                            reject(evt);
                        }
                        cleanup();
                    };
                };
                var cleanup = function () {
                    if (global[cbName] && typeof global[cbName] === 'function') {
                        global[cbName] = null;
                    }
                };
                tag_1.onload = handleResult('loaded');
                tag_1.onerror = handleResult('error');
                // Pick off callback, if there is one
                if (src.match(/callback=CALLBACK_NAME/)) {
                    src = src.replace(/(callback=)[^\&]+/, "$1" + cbName);
                    cb = window[cbName] = tag_1.onload;
                }
                else {
                    tag_1.addEventListener('load', tag_1.onload);
                }
                tag_1.addEventListener('error', tag_1.onerror);
                tag_1.src = src;
                var atag = tag_1;
                atag.onreadystatechange = function () {
                    handleResult(atag.readyState);
                };
                tag_1 = atag;
                body.appendChild(tag_1);
                return tag_1;
            });
            var initialState = {
                loaded: false,
                error: false,
                resolved: false,
                errored: false,
                promise: promise,
                tag: tag_1
            };
            Cache.scriptMap.set(key, initialState);
        }
        return Cache.scriptMap.get(key);
    };
    Cache.scriptMap = new Map();
    Cache.counter = 0;
    return Cache;
}());
exports.Cache = Cache;
exports.ScriptCache = (function (global) {
    return function ScriptCache(scripts) {
        var cache = new Cache(scripts);
        return cache;
    };
});
//export default ScriptCache;
//# sourceMappingURL=scriptcache.js.map