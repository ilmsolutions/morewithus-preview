import {Document, Schema, Model, model} from 'mongoose';
import {IClient} from './interfaces/client';

export interface IClientModel extends IClient, Document{

}

export var ClientSchema: Schema = new Schema({
  name: {type: String, unique: true, required: true},
  id: {type: String, required: true},
  secret: {type: String, required: true},
  userid: {type: String, required:true},
  baseuri: {type: String, required: true},
  redirecturi: {type: String, required: true}
});

ClientSchema.pre('save', next => {
   //do something
   next();
});

export const Client: Model<IClientModel> = model<IClientModel>('Client',ClientSchema);