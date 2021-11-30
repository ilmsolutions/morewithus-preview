import * as GeoCoder from 'node-geocoder';
import * as nconf from 'nconf';


const geoCoder = GeoCoder({
    provider: 'google',
    httpAdapter: 'https', 
    apiKey: nconf.get('keys').googleMaps
}) ;

export const helpers = {
     getFlashStatus: function(req){
         let status = [];
         ['error', 'info', 'redirect', 'warn'].forEach(function(type){
             var messages = req.flash(type);
             if(messages.length >= 1)
              status.push({statusCode: type, statusMessages: messages});
         });
         //console.log(status);
         return status;
     },
     geoCode: function(address, cb){
         return geoCoder.geocode(address, cb);
     }
     ,toCurrency: function(s){
         return s.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
            , minimumFractionDigits: 0
            , maximumFractionDigits: 2
            });
     }
};