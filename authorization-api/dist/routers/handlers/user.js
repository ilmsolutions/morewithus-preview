"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../models/user");
var protectedFields = ['subscriptions',
    'mailingAddress.address1', 'mailingAddress.address2',
    'mailingAddress.city', 'mailingAddress.state',
    'location', 'contact', 'website',
    'accounts', 'email'];
exports.showUserProtectedData = function (filter, include, callback) {
    user_1.User.findOne(filter, {}, function (err, user) {
        if (err || !user) {
            return callback(err || new Error('no user found'));
        }
        if (include) {
            var o = user.toObject();
            protectedFields.forEach(function (field) {
                if (include.indexOf(field) < 0) {
                    var fields = field.split('.');
                    (fields.length > 1 ? delete o[fields[0]][fields[1]] :
                        delete o[field]);
                }
            });
            return callback(null, o);
        }
        return callback(null, user);
    });
};
//# sourceMappingURL=user.js.map