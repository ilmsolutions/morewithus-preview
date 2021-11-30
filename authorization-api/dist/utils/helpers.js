"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeoCoder = require("node-geocoder");
var nconf = require("nconf");
var geoCoder = GeoCoder({
    provider: 'google',
    httpAdapter: 'https',
    apiKey: nconf.get('keys').googleMaps
});
exports.helpers = {
    getFlashStatus: function (req) {
        var status = [];
        ['error', 'info', 'redirect', 'warn'].forEach(function (type) {
            var messages = req.flash(type);
            if (messages.length >= 1)
                status.push({ statusCode: type, statusMessages: messages });
        });
        //console.log(status);
        return status;
    },
    geoCode: function (address, cb) {
        return geoCoder.geocode(address, cb);
    },
    toCurrency: function (s) {
        return s.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    }
};
//# sourceMappingURL=helpers.js.map