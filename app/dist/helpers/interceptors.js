"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var cacheable = true, querystring = require('querystring');
exports.interceptors = {
    init: function () {
        // // On request, return the cached version, if any
        // axios.interceptors.request.use(request => {
        //     // Only cache GET requests
        //     if (request.method === 'get' && cacheable) {
        //         let url = request.url;
        //         // Append the params, I use jquery param but you can change to whatever you use
        //         if (request.params)
        //             url += '?' + querystring.stringify(request.params);
        //         //console.log(url);
        //         const _cached = CacheUtils.get(url);
        //         //console.log('is their a cached entry ');
        //         //console.log(_cached);
        //         if (_cached) {
        //             //console.log('am cached');
        //            // _cached.__fromCache = true;
        //             //console.log(`"${url}" served from cache:`, _cached);
        //             request.data = _cached;
        //             // Set the request adapter to send the cached response and prevent the request from actually running
        //             request.adapter = () => {
        //                 return Promise.resolve({
        //                     data: _cached,
        //                     status: 200,
        //                     statusText: '',
        //                     headers: request.headers,
        //                     config: request,
        //                     request: request
        //                 });
        //             };
        //         }
        //     }
        //     return request;
        // }, error => Promise.reject(error));    
        axios_1.default.interceptors.response.use(function (response) {
            // //console.log('i should be called for each response');
            // // if you dont want to cache a specific url, send a param `__cache = false`
            // //const isCacheable = !response.config.params || (response.config.params && response.config.params.__cache !== false);
            // //console.log(response.config.params);
            // const isCacheable = response.config.params && response.config.params.__cache === true;
            // //console.log('check if this is cacheable ' + isCacheable);
            // if (cacheable && isCacheable) {
            //     let url = response.config.url;
            //     if (response.config.params)
            //         url += '?' + querystring.stringify(response.config.params);
            //     //console.log('key in response ' + url);
            //     //console.log(response.config.method);
            //     if (response.config.method === 'get') {
            //         // On get request, store the response in the cache
            //         CacheUtils.put(url, response.data);
            //     } else {
            //         // For post, put or delete, just delete the cached version of the url
            //         // e.g. posting to `/users` would delete the `/users` cache, so when you ask for users again you get the real version
            //         CacheUtils.delete(response.config.url);
            //         // also, when making a post,put or delete request to `/users/1`, would try to delete the `/users` for the same reason
            //         const parentUri = /(.*)\/([a-z0-9\-]+)\/?$/ig.exec(url);
            //         if (parentUri)
            //             CacheUtils.delete(`${parentUri[1]}`);
            //          // Delete similar url that just have query string diferences
            //         // Specially useful for things like Laravel's `with` param
            //         // e.g. `/users?with=permissions` will get cached but the post to `/users` wont remove it from the cache
            //         // so I look all the cached url's and try to match it without the querystrings
            //         const urls = CacheUtils.keys();
            //         for (const _url of urls) {
            //             if (_url.match(/^[^?]+/)[0] === response.config.url)
            //                 CacheUtils.delete(_url);
            //         }
            //      }
            // }            
            return response;
        }, function (error) {
            //console.log('am interceptor error handler');
            if (error.response && 401 === error.response.status) {
                window.sweetalert({
                    title: "Session Expired",
                    text: "Your session has expired. Would you like to be redirected to the login page?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                }, function () {
                    //window.location.reload();
                    window.location.href = '/auth/logout';
                });
            }
            else if (error.response && 403 === error.response.status) {
                window.sweetalert({
                    title: "Forbidden",
                    text: "Insufficient permissions. You will be redirected to the home page.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                }, function () {
                    window.location.href = '/';
                });
            }
            else {
                return Promise.reject(error);
            }
        });
    }
};
//# sourceMappingURL=interceptors.js.map