"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return a unique identifier with the given `len`.
 *
 * utils.uid(10);
 * // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
function uid(len) {
    var buf = [], chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', charlen = chars.length;
    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
    return buf.join('');
}
exports.uid = uid;
//http://stackoverflow.com/questions/4994201/is-object-empty
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null)
        return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
/**
 * Return an array with unique values
 *
 * @param {[]} values
 * @return {[]}
 * @api private
 */
function unique(values) {
    var n = {}, r = [];
    for (var i = 0; i < values.length; i++) {
        if (!n[values[i]]) {
            n[values[i]] = true;
            r.push(values[i]);
        }
    }
    return r;
}
exports.unique = unique;
/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=cutils.js.map