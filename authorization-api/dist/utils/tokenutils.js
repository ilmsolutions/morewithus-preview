"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PATH = require("path");
var fs = require("fs");
var nconf = require("nconf");
var cutils_1 = require("./cutils");
var jwt = require("jsonwebtoken");
var ROOT = '../';
var privatekey = fs.readFileSync(PATH.resolve(__dirname, ROOT, nconf.get('certs').privatekey));
var publickey = fs.readFileSync(PATH.resolve(__dirname, ROOT, nconf.get('certs').publickey));
/**
 * Creates a signed JSON WebToken and returns it.  Utilizes the private certificate to create
 * the signed JWT.  For more options and other things you can change this to, please see:
 * https://github.com/auth0/node-jsonwebtoken
 *
 * @param  {Number} exp - The number of seconds for this token to expire.  By default it will be 60
 *                        minutes (3600 seconds) if nothing is passed in.
 * @param  {String} sub - The subject or identity of the token.
 * @return {String} The JWT Token
 */
function createToken(_a) {
    var _b = _a.exp, exp = _b === void 0 ? 3600 : _b, _c = _a.sub, sub = _c === void 0 ? '' : _c;
    var token = jwt.sign({
        jti: cutils_1.uid(256),
        sub: sub,
        exp: Math.floor(Date.now() / 1000) + exp,
    }, privatekey, {
        algorithm: 'RS256',
    });
    return token;
}
exports.createToken = createToken;
;
/**
 * Verifies the token through the jwt library using the public certificate.
 * @param   {String} token - The token to verify
 * @throws  {Error} Error if the token could not be verified
 * @returns {Object} The token decoded and verified
 */
function verifyToken(token) {
    return jwt.verify(token, publickey);
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=tokenutils.js.map