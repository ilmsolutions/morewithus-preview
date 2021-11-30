import * as React from 'react';
import axios from 'axios';
import {BaseComponent} from './basecomponent';

export class AuthBaseComponent extends BaseComponent{

    getResource(resource, config?){
        config = config || {};
        let resourceurl = '';
        
        switch(true){
            case /locals\.[\w.]+$/.test(resource):
                resourceurl = '/api/auth/locals/' + resource.substring(resource.indexOf('locals.') + 7);
                break;
            case /data\.[\w.]+$/.test(resource):
                resourceurl = '/api/data/json/' + resource.substring(resource.indexOf('data.') + 5);
                break;
            case /change/.test(resource):
                resourceurl = '/api/auth/externalwencryption/authorization/' + resource;
                break;
            case /typeaheads\.\w+$/.test(resource):   
            case /configuration\.\w+$/.test(resource):   
            case /report\.\w+$/.test(resource):
            case /settings\.\w+$/.test(resource):                  
            case /user/.test(resource):
                resourceurl = '/api/auth/external/authorization/' + resource;
                break;
        }
        //console.log(resourceurl);
        return axios.get(resourceurl, config);
    }    

    postResource(resource, data?){
        let resourceurl = '';
        switch(true){
            case /configuration\.\w+$/.test(resource):
            case /report\.\w+$/.test(resource):
                resourceurl = '/api/auth/external/admin/' + resource;
                break;
            case /upload\.\w+$/.test(resource):
                resourceurl = '/api/auth/upload/' + resource.substring(resource.indexOf('upload.') + 7);
                break;              
        }

        return axios.post(resourceurl, data);       
    }

    deleteResource(resource, data?){
        let resourceurl = '';
        switch(true){
            case /configuration\.\w+$/.test(resource):
            case /report\.\w+$/.test(resource):            
                resourceurl = '/api/auth/external/admin/' + resource;
                break;
        }

        return axios.delete(resourceurl, Object.assign({}, {params: data}));         
    }
}