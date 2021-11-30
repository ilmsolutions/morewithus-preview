import * as express from 'express';
import * as nconf from 'nconf';
import * as request from 'request';

export const authorizedApiRequest = function(req, resourceurl, params, done){
    let headers = {  
      "Content-Type": "application/json",
      "Authorization": "Bearer " + req.session.passport.user.accesstoken
     };
     let options = {
             headers: headers, 
             uri: resourceurl,
             method: (params.method) ? params.method : 'GET',
             qs: params.qs
     };
     
     if(options.method == 'POST'){
         options = Object.assign({}, options, {
             body: JSON.stringify(params.body)
         });
     }
    
  
    request(options, function(err, res, body){
          //console.log('in call back after getting user profile'); 
          //console.log(res.statusCode);       
          if(err) return done(err);
          
          if(res.statusCode != 200) {   
              //console.log(body);         
              return done({statusCode: res.statusCode}, body);
          }
          return done(null, body); 
    });
  };
  
export const getApiRequest = function(req, res, api, resource, id, query){
    let resourceurl = resolveResourceUrl(api, resource) + ((query && query.length > 0) ? '?' + query : '');
    authorizedApiRequest(req, resourceurl + (id ? '/' + id : ''), {}, function(err, response){
        //console.log(response);
        //console.log(err);
        //console.log(response.body);
        if(err){
             res.status(err.statusCode).json(err);
        }
        else 
             res.json(response);     
    });   
   
};

export const postApiRequest = function(req, res, api, resource, body, cb?){
    let resourceurl = resolveResourceUrl(api, resource),
        defcb = (err, response) =>{
            if(err){
               res.status(err.statusCode).json(response);
            }
            else
               res.json(response);
        };
    //console.log('body....');
    //console.log(req.body);
    authorizedApiRequest(req, resourceurl, {method: 'POST', body: body}, 
                         cb ? cb : defcb);
 
}

export const deleteApiRequest = function(req, res, api, resource, body, cb?){
    let resourceurl = resolveResourceUrl(api, resource),
    defcb = (err, response) =>{
        if(err){
           res.status(err.statusCode).json(response);
        }
        else
           res.json(response);
    };
  //console.log('body....');
  //console.log(body.params);
    authorizedApiRequest(req, resourceurl, {method: 'DELETE', qs: body.params}, 
                         cb ? cb : defcb);
}

function resolveResourceUrl(api: string, resource: string){
    let resourceurl;
    switch(api){
        case 'authorization':
        case 'admin':
             resourceurl = nconf.get('passport.oauth2').endpoint;
             break;
    }
    switch(true){
         case /^users/.test(resource):
         case /^subscription/.test(resource):
                 resourceurl += '/api/auth/' + resource;
                 break;  
         case /^changepassword/.test(resource):
                 resourceurl += '/api/auth/' + resource;
                 break;    
         case /^user/.test(resource):
                 resourceurl += '/api/auth/user';
                 break;             
         case /^typeaheads\.\w+$/.test(resource):
                 resourceurl += '/api/auth/typeaheads/' + resource.substring(resource.indexOf('.') + 1);
                 break;
         case /^configuration\.\w+$/.test(resource):
                 resourceurl += '/api/admin/configuration/' + resource.substring(resource.indexOf('.') + 1);
                 break;
         case /^report\.\w+$/.test(resource):
                 resourceurl += '/api/admin/report/' + resource.substring(resource.indexOf('.') + 1);
                 break;
         case /^settings\.\w+$/.test(resource):
                 resourceurl += '/api/settings/configuration/' + resource.substring(resource.indexOf('.') + 1);
    }
    console.log(resourceurl);
    return resourceurl;
 }
 