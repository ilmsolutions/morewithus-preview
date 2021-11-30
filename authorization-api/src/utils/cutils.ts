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
  export function uid(len: number) { 
        var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }

//http://stackoverflow.com/questions/4994201/is-object-empty
export function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
 
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
 
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }
 
    return true;
}
/**
 * Return an array with unique values
 *
 * @param {[]} values
 * @return {[]}
 * @api private
 */
export function unique(values: any[]){
	var n = {},r=[];
	for(var i = 0; i < values.length; i++) 
	{
		if (!n[values[i]]) 
		{
			n[values[i]] = true; 
			r.push(values[i]); 
		}
	}
	return r;
}

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