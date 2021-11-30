class Account{
   kind: string;
   uid?: string;
   username?: string;
   password?: string;
   isverified: Boolean;
}

class Address{
    kind: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
}

class Contact{
    phone: string;
}

class Location{
    type: string;
    coordinates: Array<Number>;    
}

class Subscription{
    planid: string;
    paymentid: string;
    payerid: string;
    paymenttoken: string;
    usercontext: string;
    startdate: Date;
    expirationdate: Date;
    isexpired: Boolean;
}
export interface IUser{
    usertype: string,
    usercontext: string, 
    firstname: string,
    lastname: string,
    email: string,
    accounts: Array<Account>,
    subscriptions:Array<Subscription>,
    mailingAddress: Address,
    location: Location,
    website: string,
    organizationname: string,
    contact: Contact, 
    ageRange: string,
    jobsWithinMiles: Number,
    employmentTypes: Array<string>,
    availableTimes: Array<string>,
    jobTypes: Array<string>,
    workExperience: string,
    workAreas: Array<string>,
    educationLevel: string,
    description: string,
    certifications: Array<string>,
    skills: Array<string>,
    awards: Array<string>,
    keywords: Array<string>,
    hasReferences: Boolean,
    isregisteredemployee: Boolean,
    isregisteredemployer:Boolean,
    isblocked: Boolean,
    createdon: Date,
    lastlogin: Date  
}

