import * as PATH from 'path';
import * as fs from 'fs';
import * as nconf from 'nconf';
import {uid}  from './cutils';
import * as jwt from 'jsonwebtoken';

const ROOT = '../';
const privatekey = fs.readFileSync(PATH.resolve(__dirname, ROOT, nconf.get('certs').privatekey));
const publickey = fs.readFileSync(PATH.resolve(__dirname, ROOT, nconf.get('certs').publickey));

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
export function createToken({ exp = 3600, sub = '' }){
  const token = jwt.sign({
    jti : uid(256),
    sub,
    exp : Math.floor(Date.now() / 1000) + exp,
  }, privatekey, {
    algorithm: 'RS256',
  });

  return token;
};

/**
 * Verifies the token through the jwt library using the public certificate.
 * @param   {String} token - The token to verify
 * @throws  {Error} Error if the token could not be verified
 * @returns {Object} The token decoded and verified
 */
export function verifyToken(token) {
   return jwt.verify(token, publickey);
}