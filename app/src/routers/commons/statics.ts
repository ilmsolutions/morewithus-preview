import {getApiResource} from './apiservice';

class statics{
    private static instance: statics;
    private _statics; 
 
    constructor(){
          this._statics = this.init();
          setInterval(() =>{
              //refresh every 10 minutes
              //console.log('being called');
              this._statics = this.init();
  
          }, 1000 * 60 * 10);
    }

    public static Instance(){
        if(!this.instance){
           this.instance = new statics();
        }
        return this.instance;        
    }

    private init(){
        let _statics = new Map()
        getApiResource('authorization', 'settings.Pages,Home Banner', null, (err, res) => {
            if(!err && res){
                var response = JSON.parse(res);
               _statics.set('banner', {              
                        body: response[0]['custom'].body
                      ,title: response[0]['custom'].title              
               });           
            }
        });
        getApiResource('authorization', 'settings.SocialLogins', null, (err, res) => {
            if(!err && res){
                var response = JSON.parse(res);
                //console.log(response);
               _statics.set('socials', response[0]['custom']);           
            }
        });        
        getApiResource('authorization', 'settings.Pages', 'metaonly=true', (err, res) =>{
           if(!err && res){
               var response = JSON.parse(res);
               var metatags = response.map(item => {
                   return {
                    type: item.path.match(/,pages,(.*?),/i)[1] 
                    ,...item.custom
                  };
               });
              _statics.set('metatags',  metatags);
               
           }
        });
        return _statics;
     
    }

    public get(key){
        return this._statics.get(key);
    }

    public set(key, value){
        return this._statics.set(key, value);
    }
}

export const Statics = statics.Instance()