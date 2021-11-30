import {Document, Schema, Model, model, SchemaType} from 'mongoose';
import {IEventLog} from './interfaces/eventlog';

export interface IEventLogDocument extends IEventLog, Document{
}

export interface IEventLogModel extends Model<IEventLogDocument>{
}

export var EventLogSchema: Schema = new Schema({
    type: {type:String, required: true},
    timestamp: {type: Date, required: true, default: Date.now},
    user: {type: String, required: true}
});

export const EventLog = <IEventLogModel>model('EventLog', EventLogSchema);
