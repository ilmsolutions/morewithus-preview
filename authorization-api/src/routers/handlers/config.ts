import {Config} from '../../models/admin/config';

export function getConfigs(path, filter: object){
    return Config.find({path: path, ...filter}, (err, configs) => {
        if(err)
          return null;
        return configs;  
    });
}
