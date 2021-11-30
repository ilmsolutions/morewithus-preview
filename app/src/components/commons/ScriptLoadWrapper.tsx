import * as React from 'react';
import {ScriptCache, Cache} from '../../helpers/scriptcache';

export const ScriptLoadWrapper = (scripts, Wrapped) => class extends React.Component<any, any>{
    cache: Cache;

    constructor(props){
        super(props);
        this.onLoad = this.onLoad.bind(this);
    }

    public componentWillMount() {
        let scriptcache = ScriptCache.bind(Wrapped)();
        this.cache = scriptcache(scripts);
        //console.log('component will mount');
        //console.log(scriptcache);
        //console.log(this.cache);
    }  
    
    onLoad(cb, reject){
      //  console.log('on load');
      //  console.log(this.cache);
        let cache = this.cache;
        Object.keys(scripts).forEach(function(key){
              cache[key].onLoad(cb, reject);
        });
    }

    render(){
        return  <Wrapped  {...this.props}
                          onLoad={this.onLoad} />;
    }
}