import * as nconf from 'nconf';
import * as request from 'request';

export const getApiRequest = function(req, res, api, resource, query){
    getApiResource(api, resource, query, (err, response) => {
        if(err){
            res.status(err.statusCode).json(response);
        }
        else
            res.json(response);       
    });     
}

export const postApiRequest = function(req, res, api, resource, body, cb?){
    let resourceurl = resolveResourceUrl(api, resource),
    defcb = cb ? cb : (err, response) =>{
        if(err){
           res.status(err.statusCode).json(response);
        }
        else
           res.json(response);
    };

    apiRequest(resourceurl, {method: 'POST', body: body},  defcb);
    
}

export const getApiResource = function(api, resource, query, done){
    let resourceurl = resolveResourceUrl(api, resource) + ((query && query.length > 0) ? '?' + query : '');
    apiRequest(resourceurl, {method: 'GET'}, done);
}

let apiRequest = function(resourceurl, params, done){
    let headers = {  
        "Content-Type": "application/json"
       };
      
   let options = {
           headers: headers,
           uri: resourceurl,
           method: (params.method) ? params.method : 'GET'
   };
   
   if(options.method == 'POST'){
       options = Object.assign({}, options, {
           body: JSON.stringify(params.body)
       });
   }

  request(options, function(err, res, body){
        //console.log('in call back after getting user profile');        
        if(err) return done(err);
        
        if(res.statusCode != 200) {   
            //console.log(body);         
            return done({statusCode: 400}, body);
        }
        return done(null, body); 
  });
};


let resolveResourceUrl = function(api: string, resource: string){
    let resourceurl;
    switch(api){
        case 'authorization':
             resourceurl = nconf.get('passport.oauth2').endpoint;
             break;
    }
    //console.log(resource);
    switch(true){
        case /logout/.test(resource):
             resourceurl += '/api/logout';
             break;    
        case /typeaheads\.\w+$/.test(resource):
             resourceurl += '/api/typeaheads/' + resource.substring(resource.indexOf('.') + 1);
             break;    
        case /users/.test(resource):
             resourceurl += '/api/' + resource;
             break;    
        case /^settings\.[\w\s,]+$/.test(resource):
             resourceurl += '/api/settings/configuration/' + resource.substring(resource.indexOf('.') + 1);
             break;
        case /^notifications\.[\w\s,]+$/.test(resource):
             resourceurl += '/api/notifications/' + resource.substring(resource.indexOf('.') + 1);
             break;
                     
    }
    
    return resourceurl;
 }