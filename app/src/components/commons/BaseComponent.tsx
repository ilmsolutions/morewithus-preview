import * as React from 'react';
import axios from 'axios';


export class BaseComponent extends React.Component<any, any>{  
    _bind(...methods){
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    getResource(resource, config?){
        config = config || {};
        let resourceurl = '';
        //console.log(resource);
        switch(true){
            case /data\.[\w.]+$/.test(resource):
                resourceurl = '/api/data/json/' + resource.substring(resource.indexOf('data.') + 5);
                break;
            case /settings\.[\w\s,]+$/.test(resource):  
                 resourceurl = '/api/external/authorization/' + resource;         
                 break;
        }
        //console.log(resourceurl);
        return axios.get(resourceurl, config);
    }    

    postResource(resource, data?){
        let resourceurl = '';
        switch(true){
            case /notifications\.[\w\s,]+$/.test(resource):
                resourceurl = '/api/external/authorization/' + resource;
                break;              
        }
        return axios.post(resourceurl, data);       
    }
}