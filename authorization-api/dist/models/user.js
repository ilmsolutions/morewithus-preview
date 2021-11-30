"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var mongoose_1 = require("mongoose");
exports.AccountSchema = new mongoose_1.Schema({
    kind: { type: String, required: true },
    uid: { type: String },
    username: { type: String },
    password: { type: String },
    isverified: { type: Boolean, default: false }
});
exports.AddressSchema = new mongoose_1.Schema({
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }
});
exports.LocationSchema = new mongoose_1.Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
});
exports.ContactSchema = new mongoose_1.Schema({
    phone: { type: String }
});
exports.SubscriptionSchema = new mongoose_1.Schema({
    planid: { type: String },
    paymentid: { type: String },
    payerid: { type: String },
    paymenttoken: { type: String },
    paymentdate: { type: Date },
    orderid: { type: String },
    orderamount: { type: Number },
    usercontext: { type: String },
    startdate: { type: Date },
    expirationdate: { type: Date },
    isexpired: { type: Boolean, default: false }
});
exports.UserSchema = new mongoose_1.Schema({
    usercontext: { type: String, enum: ['Employee', 'Employer'] },
    usertype: { type: String, enum: ['Individual', 'Organization'] },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    accounts: {
        type: [exports.AccountSchema],
        required: true
    },
    subscriptions: {
        type: [exports.SubscriptionSchema]
    },
    mailingAddress: { type: exports.AddressSchema },
    location: { type: exports.LocationSchema },
    contact: { type: exports.ContactSchema },
    organizationname: { type: String },
    website: { type: String },
    ageRange: { type: String },
    jobsWithinMiles: { type: Number },
    employmentTypes: { type: [String], enum: ['Fulltime', 'Parttime'] },
    jobTypes: { type: [String] },
    availableTimes: { type: [String], enum: ['Available', 'Morning', 'Afternoon', 'Evening', 'Night'] },
    workExperience: String,
    workAreas: { type: [String] },
    educationLevel: String,
    description: String,
    certifications: { type: [String] },
    skills: { type: [String] },
    awards: { type: [String] },
    keywords: { type: [String] },
    hasReferences: { type: Boolean, default: false },
    isregisteredemployee: { type: Boolean, default: false },
    isregisteredemployer: { type: Boolean, default: false },
    isblocked: { type: Boolean, default: false },
    createdon: { type: Date, default: Date.now },
    lastlogin: { type: Date, default: Date.now }
});
exports.UserSchema.index({
    jobTypes: 'text', workAreas: 'text',
    skills: 'text', workExperience: 'text',
    keywords: 'text', awards: 'text',
    certifications: 'text', description: 'text'
}, {
    weights: {
        jobTypes: 10, workAreas: 9,
        skills: 8, keywords: 7, description: 6
    },
    name: 'text'
});
exports.UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        //in case of projection being used these props can be missing
        if (ret.lastlogin) {
            var date = new Date(ret.lastlogin);
            ret.lastlogin = date.toUTCString();
        }
        if (ret.accounts) {
            var laccount = ret.accounts.filter(function (account) {
                return account.kind == 'local';
            });
            ret.isverified = laccount ? laccount[0].isverified : false;
            delete ret.accounts;
        }
        if (ret.mailingAddress) {
            delete ret.mailingAddress._id;
            delete ret.location; //internal field
        }
        else
            ret.mailingAddress = {};
        if (ret.subscriptions) {
            ret.subscriptions = ret.subscriptions.filter(function (subscription) {
                return subscription.isexpired == false;
            }).map(function (subscription) {
                delete subscription.payerid;
                delete subscription.paymenttoken;
                delete subscription.paymentid;
                return subscription;
            });
        }
        //delete ret._id;
        return ret;
    },
    getters: true,
    virtuals: true
});
exports.UserSchema.set('toObject', { getters: true, virtuals: true });
exports.UserSchema.pre('save', function (next) {
    //do something
    //console.log('in pre save');
    next();
});
exports.UserSchema.virtual('isactiveemployee').get(function () {
    var _this = this;
    //console.log('in isactiveemployee.... ' + this.usertype )
    if (!this.isregisteredemployee || this.isblocked)
        return false;
    var rules = exports.User.rules();
    rules = rules ? rules.filter(function (rule) {
        return rule.custom['usertype'] == _this.usertype;
    }) : null;
    if (rules != null && rules.length > 0) {
        return rules.map(function (rule) {
            var date = new Date(_this[rule.custom['field']]);
            var duration = new Date().addDuration(rule.custom['duration']);
            //console.log(date + ' ' + duration + ' ' + (date >= duration));
            return date >= duration ? true : false;
        }).filter(function (v) { return !v; }).length <= 0;
    }
    else { //organization
        return this.subscriptions != null && this.subscriptions.filter(function (subscription) {
            //console.log(subscription);
            return (subscription.isexpired == false && subscription.usercontext.toLowerCase() == 'employee');
        }).length > 0 ? true : false;
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
exports.UserSchema.virtual('isactiveemployer').get(function () {
    if (!this.isregisteredemployer)
        return false;
    return this.subscriptions != null && this.subscriptions.filter(function (subscription) {
        return (subscription.isexpired == false && subscription.usercontext.toLowerCase() == 'employer');
    }).length > 0 ? true : false;
});
exports.UserSchema.virtual('isverified').get(function () {
    if (!this.accounts)
        return false;
    return this.accounts.filter(function (acct) {
        return acct.kind == 'local' && acct.isverified == true;
    }).length > 0;
});
var _rules = [];
exports.UserSchema.statics = {
    rules: function (rules) {
        if (rules)
            _this._rules = rules;
        //console.log(this._rules);
        return _this._rules;
    },
    generateHash: function (password) {
        return bcrypt.hashSync(password, 10);
    },
    resetPassword: function (email, newpassword, cb) {
        var hash = exports.User.generateHash(newpassword);
        exports.User.findOneAndUpdate({
            email: email,
            accounts: {
                $elemMatch: { 'kind': 'local' }
            }
        }, {
            $set: { 'accounts.$.password': hash }
        }, function (err, user, res) {
            if (err || !user)
                return cb(err || new Error(''));
            return cb(err, true);
        });
    },
    updatePassword: function (user, password, newpassword, cb) {
        exports.User.verifyPassword(user, password, function (err, ismatch) {
            if (err)
                return cb(err);
            if (ismatch) {
                var hash = exports.User.generateHash(newpassword);
                exports.User.findOneAndUpdate({
                    _id: user._id,
                    accounts: {
                        $elemMatch: { 'kind': 'local' }
                    }
                }, {
                    $set: { 'accounts.$.password': hash }
                }, function (err, _user) {
                    if (err || !_user)
                        return cb(err || new Error(''));
                    return cb(err, true);
                });
            }
            else
                return cb(err, ismatch);
        });
    },
    verifyPassword: function (user, password, cb) {
        var laccount = user.accounts.filter(function (account) {
            return account.kind == 'local';
        });
        //console.log(laccount);
        bcrypt.compare(password, laccount[0].password, function (err, ismatch) {
            if (err)
                return cb(err);
            return cb(null, ismatch);
        });
    },
    updateLastLogin: function (user) {
        exports.User.update({ email: user.email }, { $currentDate: { lastlogin: true } }, function (err, res) {
            //console.log(err);
            //console.log(res);
        });
    },
    expireSubscriptions: function () {
        //    console.log('in expire subscriptions');
        exports.User.findOneAndUpdate({
            'subscriptions': {
                $ne: null,
                $elemMatch: {
                    'expirationdate': { $lt: new Date() },
                    'isexpired': false
                }
            }
        }, { $set: { 'subscriptions.$.isexpired': true } }, function (err, _user) {
            if (err || !_user)
                return err || new Error('Unable to update expiration');
        });
    },
    login: function (accounttype, username, password, done) {
        exports.User.findOne({ email: username,
            'accounts.kind': accounttype, 'accounts.username': username }, function (err, user) {
            if (err)
                throw err;
            if (user == null) {
                return done(null, false, { message: 'No user found with these credentials' });
            }
            exports.User.verifyPassword(user, password, function (err, ismatch) {
                if (err)
                    throw err;
                if (!ismatch) {
                    return done(null, false, { message: 'Invalid credentials' });
                }
                else if (user.isblocked) {
                    return done(null, false, { message: 'User is blocked. Please contact admin.' });
                }
                exports.User.updateLastLogin(user);
                return done(null, user);
            });
        });
    }
};
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=user.js.map