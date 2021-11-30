import * as cache from 'memory-cache';

class cacheutils{
    private static instance: cacheutils;
    private config = {};    
    private _cache: cache;
 
    constructor(config){
        this._cache = new cache.Cache();
        this.config = config;
    }

    public static Instance(config){
        if(!this.instance){
           this.instance = new cacheutils(config);
        }
        return this.instance;        
    }

    public put(key: string, value: any){
         console.log('put ' + key);
         this._cache.put(key, value, this.config['maxAge'], function(key, value){
              //console.log('cache entry for ' + key);

         });
    }

    public get(key): any{
        console.log('get ' + key);
        return this._cache.get(key);
    }

    public delete(key): any{
        console.log('delete ' + key);
        return this._cache.del(key);
    }

    public keys(): any{
        return this._cache.keys();
    }
}


export const CacheUtils = cacheutils.Instance({maxAge: 60 * 60 * 1000});