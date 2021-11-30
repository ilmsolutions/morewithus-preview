import * as bcrypt from 'bcrypt';
import {Document, Schema, Model, model, SchemaType} from 'mongoose';
import {IConfig} from './interfaces/config';

export interface IConfigDocument extends IConfig, Document{

}

export interface IConfigModel extends Model<IConfigDocument>{

}

export var ConfigSchema: Schema = new Schema({
   label:{type: String, required: true},
   value:{type: String, required: true},
   description:{type: String},
   active:{type: Boolean, default: true},
   order:{type: Number, default: 0},
   path: {type: String},
   custom: {type: Schema.Types.Mixed}
});

export const Config = <IConfigModel>model('Config', ConfigSchema);

