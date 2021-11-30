import {Document, Schema, Model, model} from 'mongoose';
import {IAuthorizationCode} from './interfaces/authorizationcode';

export interface IAuthorizationCodeModel extends IAuthorizationCode, Document{

}

export var AuthorizationCodeSchema: Schema = new Schema({
  code: {type: String, unique: true, required: true},
  clientid: {type: String, required: true},
  redirecturi: {type: String, required: true},
  userid: {type: String, required: true},
  scope: {type: String, required: true}
});

AuthorizationCodeSchema.pre('save', next => {
   //do something
   next();
});

export const AuthorizationCode: Model<IAuthorizationCodeModel> = model<IAuthorizationCodeModel>('AuthorizationCode',AuthorizationCodeSchema);