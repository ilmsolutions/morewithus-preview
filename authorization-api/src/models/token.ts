import {Document, Schema, Model, model} from 'mongoose';
import {IToken} from './interfaces/token';

export interface ITokenModel extends IToken, Document{

}

export var TokenSchema: Schema = new Schema({
  value: {type: String, required: true},
  clientid: {type: String, required: true},
  userid: {type: String, required:true}  
});

TokenSchema.pre('save', next => {
   //do something
   next();
});

export const Token: Model<ITokenModel> = model<ITokenModel>('Token',TokenSchema);