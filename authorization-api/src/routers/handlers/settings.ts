import {Config, IConfigModel} from '../../models/admin/config';

export function getConfig(key, metaonly: boolean, cb?){
    cb = cb  || ((err, res) => { return !err ? res : null; });
    var key = key;
    var patt = new RegExp('^,' + key + ',', 'i');
    //console.log('coming through...' + key);

    var sort = {}
       ,projection = null
       ,filter = {path: patt};
    switch(true){
      case /subscriptions/i.test(key):
        sort = {'custom.price' : 1};          
        break;
      case /pages/i.test(key):
        if(metaonly)
          projection ={'custom.body': 0};
      default:
        sort = {order: 1};
        filter = Object.assign({}, filter, {
          active: true
        });
    }

    return Config.find(filter, projection).sort(sort).exec(cb);  
}
