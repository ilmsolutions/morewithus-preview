"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
var user_1 = require("../../models/user");
var helpers_1 = require("../../utils/helpers");
var settings_1 = require("./settings");
exports.handleSearch = function (query, near, projection, callback) {
    //business rules
    settings_1.getConfig('rules', false).then(function (res) {
        user_1.User.rules(res);
    });
    var result = { query: query };
    var search = {
        start: function () {
            var match = query.toLowerCase() == "all" ? [] :
                [{ $match: { $text: { $search: query } } }];
            if (near != null) {
                //first result will be geocode result
                //second will be full text
                var queries = [], cb = function (err, results) { return (err != null) ? search.finish(err, null) : results; };
                queries.push(function (cb) { geocodeAsync(near, cb); });
                queries.push(function (cb) { search.fulltextforids(match, cb); });
                async.parallel(queries, function (err, results) {
                    if (err != null)
                        return search.finish(err, null);
                    if (results.length != queries.length)
                        return search.finish(new Error('Unidentified error in request processing'), null);
                    var ids = results[1].map(function (user) {
                        return user._id;
                    }), loc = results[0][0];
                    result = Object.assign({}, result, { location: loc['formattedAddress'] });
                    search.filterbylocation(loc, ids);
                });
            }
            else
                search.fulltext(match, search.finish);
        },
        filterbylocation: function (loc, ids) {
            search.execute([
                {
                    $geoNear: {
                        near: { type: "Point", coordinates: [loc.longitude, loc.latitude] },
                        distanceField: 'dist.calculated',
                        spherical: true,
                        distanceMultiplier: 0.0006214,
                        query: { _id: { $in: ids } }
                    }
                },
                { $sort: { 'dist.calculated': 1
                        //   , usertype: -1
                        ,
                        lastlogin: -1
                    } }
            ], search.finish);
        },
        fulltext: function (match, cb) {
            var sort = Object.assign({} //, {usertype: -1}
            , match.length > 0 ? { score: { $meta: 'textScore' } } : {}, { lastlogin: -1 });
            return search.execute(match.concat([
                { $sort: sort }
            ]), cb);
        },
        fulltextforids: function (match, cb) {
            var sort = Object.assign({}, match.length > 0 ? { score: { $meta: 'textScore' } } : {}, { lastlogin: -1 });
            return search.execute(match.concat([
                { $sort: sort },
                { $project: { _id: 1 } }
            ]), cb);
        },
        execute: function (conditions, cb) {
            //console.log(conditions);    
            user_1.User.aggregate.apply(user_1.User, conditions.concat([projection //{ $project: {accounts: 0, email: 0, mailingAddress: 0, location: 0, contact: 0}}
            ])).exec(function (err, users) {
                if (err || !users) {
                    return cb(err || new Error('no users matching query found'));
                }
                //console.log(users.length);
                cb(null, users.map(function (u) {
                    var _u = new user_1.User(u);
                    u['isactiveemployee'] = _u['isactiveemployee'];
                    return u;
                }));
            });
        },
        finish: function (err, res) {
            var o = null;
            if (res != null) {
                o = {
                    result: result,
                    users: res
                };
            }
            callback(err, o);
        }
    };
    return search;
};
function geocodeAsync(near, cb) {
    helpers_1.helpers.geoCode(near, function (err, result) {
        if (err || result == null || result.length <= 0) {
            return cb(err || new Error('invalid address'));
        }
        return cb(null, result);
    });
}
//# sourceMappingURL=search.js.map