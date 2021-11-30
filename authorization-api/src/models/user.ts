import * as bcrypt from 'bcrypt';
import {Document, Schema, Model, model, SchemaType} from 'mongoose';
import {IUser} from './interfaces/user';
import {Config, IConfigDocument} from './admin/config';

export interface IUserDocument extends IUser, Document{
}

export interface IUserModel extends Model<IUserDocument>{
   rules(_rules?:IConfigDocument[]): IConfigDocument[];
   generateHash(password:string): string;
   resetPassword(email: string, password: any, callback: any):void;
   updatePassword(user: IUserDocument, password:any, newpassword:any, callback: any):void,
   verifyPassword(user: IUserDocument, password:any, callback: any):void; 
   updateLastLogin(user: IUserDocument):void;    
   expireSubscriptions():void;
   login(accounttype: string, username: string, password: string, callback: any): any;
}

export var AccountSchema: Schema = new Schema({
   kind: {type: String, required: true},
   uid: {type: String},
   username: {type: String},
   password: {type: String},
   isverified: {type: Boolean, default: false}
});

export var AddressSchema: Schema = new Schema({
   address1: {type: String, required:true},
   address2: {type:String},
   city: {type: String, required: true},
   state:{type: String, required: true},
   zipcode: {type: String, required: true}
});

export var LocationSchema: Schema = new Schema({
    type: {type: String, default: 'Point'},
    coordinates:{type: [Number], index: '2dsphere'}
});

export var ContactSchema: Schema = new Schema({
    phone:{type: String}
});

export var SubscriptionSchema: Schema = new Schema({
    planid: {type: String},
    paymentid: {type: String},
    payerid: {type: String},
    paymenttoken:{type: String},
    paymentdate:{type: Date},
    orderid: {type: String},
    orderamount: {type: Number},
    usercontext: {type: String},
    startdate: {type: Date},
    expirationdate: {type: Date},
    isexpired:{type: Boolean, default: false}
});

export var UserSchema: Schema = new Schema({
  usercontext:{type: String, enum:['Employee', 'Employer']},
  usertype:{type: String, enum:['Individual', 'Organization']},
  firstname: {type: String, required: true},
  lastname: {type: String,required: true},
  email: {type: String, unique: true,required: true},
  accounts:{
      type:[AccountSchema],
      required: true
  },
  subscriptions:{
      type:[SubscriptionSchema]
  },
  mailingAddress: {type: AddressSchema},
  location:{type: LocationSchema},
  contact: {type: ContactSchema},
  organizationname: {type: String},
  website:{type: String},
  ageRange: {type: String},
  jobsWithinMiles: {type: Number},
  employmentTypes:{type:[String], enum:['Fulltime', 'Parttime']},
  jobTypes: {type: [String]},
  availableTimes:{type:[String], enum:['Available', 'Morning', 'Afternoon', 'Evening', 'Night']},
  workExperience: String,
  workAreas:{type:[String]},
  educationLevel: String,
  description: String,
  certifications: {type: [String]},
  skills:{type: [String]},
  awards: {type: [String]},
  keywords: {type: [String]},
  hasReferences: {type: Boolean, default: false},
  isregisteredemployee: {type: Boolean, default: false},
  isregisteredemployer:{type: Boolean, default: false},
  isblocked:{type: Boolean, default: false},
  createdon: {type: Date, default: Date.now},
  lastlogin: {type: Date, default: Date.now}
});

UserSchema.index({
                   jobTypes: 'text', workAreas: 'text', 
                   skills: 'text', workExperience: 'text', 
                   keywords: 'text', awards: 'text', 
                   certifications: 'text', description: 'text'
                }, {
                weights:{
                   jobTypes: 10, workAreas: 9, 
                   skills: 8, keywords: 7, description: 6
                },
                name: 'text'});

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        //in case of projection being used these props can be missing
        if(ret.lastlogin){
           var date = new Date(ret.lastlogin);
           ret.lastlogin = date.toUTCString();
        }

        if(ret.accounts){
            var laccount = ret.accounts.filter(function(account){
                return account.kind == 'local';
            });
            ret.isverified = laccount ? laccount[0].isverified : false;
            delete ret.accounts;
        }
       
        if(ret.mailingAddress){
           delete ret.mailingAddress._id;
           delete ret.location; //internal field
        }
        else
           ret.mailingAddress = {};


        if(ret.subscriptions){
            ret.subscriptions = ret.subscriptions.filter(function(subscription){
                return subscription.isexpired == false;
            }).map(function(subscription){
                 delete subscription.payerid;
                 delete subscription.paymenttoken;
                 delete subscription.paymentid;
                 return subscription;
            });                
        }


        //delete ret._id;
        return ret;
    },
    getters:true,
    virtuals: true
});

UserSchema.set('toObject', {getters: true, virtuals: true});

UserSchema.pre('save', next => {
   //do something
   //console.log('in pre save');
   next();
});

UserSchema.virtual('isactiveemployee').get(function(){
    //console.log('in isactiveemployee.... ' + this.usertype )
    if(!this.isregisteredemployee || this.isblocked)
        return false;

    let rules = User.rules()
    rules = rules ? rules.filter(rule => {
        return rule.custom['usertype'] == this.usertype;
    }) : null;
    if(rules != null && rules.length > 0){
        return rules.map(rule => {
            var date = new Date(this[rule.custom['field']]);
            var duration = new Date().addDuration(rule.custom['duration']);
            //console.log(date + ' ' + duration + ' ' + (date >= duration));
            return date >= duration ? true : false;
            }).filter(v => {return !v;}).length <= 0;              
      }
      else{//organization
        return this.subscriptions != null && this.subscriptions.filter(subscription => {
            //console.log(subscription);
            return (subscription.isexpired == false && subscription.usercontext.toLowerCase() == 'employee');
        }).length > 0 ? true: false;
     }
 
 /*    
    if(this.usertype == 'Individual'){
        var lastlogin = new Date(this.lastlogin);
        var durationhrs = 60 * 24;
        var diff = (new Date().getTime() - lastlogin.getTime()) / (1000 * 60 * 60); //hours
        return diff <= durationhrs ? true: false;
    }
    else{ //Organization
        return this.subscriptions != null && this.subscriptions.filter(subscription => {
            return (subscription.isexpired == false && subscription.usercontext.toLowerCase() == 'employee');
        }).length > 0 ? true: false;
    } */
});

UserSchema.virtual('isactiveemployer').get(function(){
    if(!this.isregisteredemployer)
        return false;

    return this.subscriptions != null && this.subscriptions.filter(subscription => {
            return (subscription.isexpired == false && subscription.usercontext.toLowerCase() == 'employer');
    }).length > 0 ? true : false;
});

UserSchema.virtual('isverified').get(function(){
    if(!this.accounts)
       return false;
    return this.accounts.filter(acct => {
        return acct.kind == 'local' && acct.isverified == true;
    }).length > 0;
});

let _rules = [];
UserSchema.statics = {
    rules: (rules) => {
       if(rules)
         this._rules = rules;
       //console.log(this._rules);
       return this._rules; 
    },
    generateHash: (password) => {
         return bcrypt.hashSync(password, 10);
    },
    resetPassword:(email, newpassword, cb) =>{
       var hash = User.generateHash(newpassword);
       User.findOneAndUpdate({
                    email: email
                    ,accounts: {
                        $elemMatch:{'kind': 'local'}
                    }
                    },
                    {
                        $set:{'accounts.$.password' : hash} 
                    },
                    (err, user, res) => {
                        if(err || !user)
                        return cb(err || new Error(''));
                     return cb(err, true);
                    }
                    );
    },
    updatePassword: (user, password, newpassword, cb) => {
        User.verifyPassword(user, password, function(err, ismatch){
            if(err)
              return cb(err);
            if(ismatch){
                var hash = User.generateHash(newpassword);
                User.findOneAndUpdate({
                    _id: user._id
                    ,accounts:{
                        $elemMatch:{'kind': 'local'}
                    }  
                  }
                  ,{
                    $set:{'accounts.$.password' : hash}                       
                  },
                  (err, _user) =>{
                    if(err || !_user)
                       return cb(err || new Error(''));
                    return cb(err, true);                 
                  }     
                );  
            }
            else
             return cb(err, ismatch);
        });
    },
    verifyPassword: (user, password, cb) => {
        var laccount = user.accounts.filter(function(account){
            return account.kind == 'local';
        });
        //console.log(laccount);
        bcrypt.compare(password, laccount[0].password, function(err, ismatch){
            if(err)
               return cb(err);
            
            return cb(null, ismatch);
        });
    },
    updateLastLogin: (user) =>{
        User.update({email: user.email}, {$currentDate: {lastlogin: true}}, function(err, res){
            //console.log(err);
            //console.log(res);
        });
    },
    expireSubscriptions: () =>{
    //    console.log('in expire subscriptions');

        User.findOneAndUpdate({
            'subscriptions': {
                $ne: null
                , $elemMatch:{
                   'expirationdate': {$lt: new Date()}
                   ,'isexpired': false
                }
            } },
            {$set: {'subscriptions.$.isexpired' : true}}
           , (err, _user) => {
               if(err || !_user)
                 return err || new Error('Unable to update expiration');
           });
    },
    login: (accounttype, username, password, done) => {
      User.findOne({email: username, 
            'accounts.kind': accounttype,'accounts.username': username}, function(err, user){
                
                  if(err)
                     throw err;
                  if(user == null){
                    return done(null, false, {message: 'No user found with these credentials'});
                  }

                   User.verifyPassword(user, password, function(err, ismatch){
                       if (err) throw err;
                       if(!ismatch){                        
                          return done(null, false, {message: 'Invalid credentials'});
                       }
                       else if(user.isblocked){
                           return done(null, false, {message: 'User is blocked. Please contact admin.'});
                       }
                        User.updateLastLogin(user);           
                       return done(null, user);
                   });
            });
  }    
}

export const User = <IUserModel>model('User',UserSchema);
