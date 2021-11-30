"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var regExpressions = {
    email: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/,
    url: /(https?|ftp)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    phone: /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/,
    dataimage: /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/,
};
exports.functions = {
    findAncestor: function (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls))
            ;
        return el;
    },
    contains: function (type, value) {
        var exp = regExpressions[type], patt = new RegExp(exp, 'ig');
        return patt.test(value);
    },
    isHidden: function (el) {
        var style = window.getComputedStyle(el);
        return ((style.display === 'none') || (style.visibility === 'hidden'));
    },
    toProperCase: function (s) {
        return s.toLowerCase().replace(/\b((m)(a?c))?(\w)/g, function ($1, $2, $3, $4, $5) {
            if ($2) {
                return $3.toUpperCase() + $4 + $5.toUpperCase();
            }
            return $1.toUpperCase();
        });
    },
    toProperDate: function (s) {
        var date = new Date(s);
        return date.toDateString();
    },
    toDisplayNumber: function (s) {
        if (isNaN(s))
            return;
        var parts = s.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    toDisplayCurrency: function (s) {
        var n = Number(s);
        if (isNaN(n))
            return;
        return n.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
    },
    toDisplayDuration: function (d) {
        var dtkns = d.match(/([0-9]+)([d|wk|mt|yr]+)/);
        if (!dtkns)
            return null;
        var dlabel = types_1.DurationTypeMap[dtkns[2]];
        return dtkns[1] > 1 ? dtkns[1] + ' ' + dlabel : dlabel.replace(/[s]+$/i, '');
    },
    translate: function (s) {
        if (!s)
            return '';
        switch (true) {
            case /employee/i.test(s):
                return 'Jobseeker';
            case /organization/i.test(s):
                return 'Business';
            default:
                return exports.functions.toProperCase(s);
        }
    },
    detectIE: function () {
        var ua = window.navigator.userAgent;
        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    },
    findWithAttr: function (array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
};
//# sourceMappingURL=common.js.map