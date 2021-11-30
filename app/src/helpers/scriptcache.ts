
type Script = {loaded: Boolean, resolved: Boolean, errored: Boolean, error: Boolean, promise: Promise<any>, tag: HTMLScriptElement};

export class Cache{
    protected static scriptMap: Map<string, Script> = new Map<string, Script>();
    protected static counter = 0;

    constructor(scripts){
        let self = this;
        Object.keys(scripts).forEach(function(key) {
            const script = scripts[key];
            self[key] = {
              tag:    Cache._scriptTag(key, script),
              onLoad: Cache._onLoad(key)
            };
          }) ;
    }

    private static _onLoad(key: string)  {
        return (cb) => {
            let stored = Cache.scriptMap.get(key);
            if (stored) {
              stored.promise.then(() => {
                stored.error ? cb(stored.error) : cb(null, stored)
              })
            } else {
              // TODO:
            }
          }
    }; 

    private static _scriptTag(key: string, src: string){
        if (!Cache.scriptMap.has(key)) {
            let tag = document.createElement('script');
            let promise = new Promise((resolve, reject) => {
              let resolved = false,
                  errored = false,
                  body = document.getElementsByTagName('body')[0];
    
              tag.type = 'text/javascript';
              tag.async = false; // Load in order
    
              const cbName = `loaderCB${Cache.counter++}${Date.now()}`;
              let cb;
    
              let handleResult = (state) => {
                return (evt) => {
                  let stored = Cache.scriptMap.get(key);
                  if (state === 'loaded') {
                    stored.resolved = true;
                    resolve(src);
                    // stored.handlers.forEach(h => h.call(null, stored))
                    // stored.handlers = []
                  } else if (state === 'error') {
                    stored.errored = true;
                    // stored.handlers.forEach(h => h.call(null, stored))
                    // stored.handlers = [];
                    reject(evt)
                  }
    
                  cleanup();
                }
              }
    
              const cleanup = () => {
                if (global[cbName] && typeof global[cbName] === 'function') {
                  global[cbName] = null;
                }
              }
    
              tag.onload = handleResult('loaded');
              tag.onerror = handleResult('error');

              // Pick off callback, if there is one
              if (src.match(/callback=CALLBACK_NAME/)) {
                src = src.replace(/(callback=)[^\&]+/, `$1${cbName}`)
                cb = window[cbName] = tag.onload;
              } else {
                tag.addEventListener('load', tag.onload)
              }
              tag.addEventListener('error', tag.onerror);
    
              tag.src = src;
              let atag = <any>tag;
              atag.onreadystatechange = () => {
                handleResult(atag.readyState)
              }
              tag = <HTMLScriptElement>atag;
              body.appendChild(tag);
              return tag;
            });

            let initialState:Script = <Script>{
              loaded: false,
              error: false,
              resolved: false,
              errored: false,
              promise: promise,
              tag: tag
            };

            Cache.scriptMap.set(key, initialState);
          }
          return Cache.scriptMap.get(key);            
    }
}


export const ScriptCache = (function(global) {
  return function ScriptCache(scripts) {
      let cache = new Cache(scripts);
      return cache;
  }
})

//export default ScriptCache;