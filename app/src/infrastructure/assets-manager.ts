import * as PATH from 'path';
import * as express from 'express';
import * as nconf from 'nconf';
import {baseManager} from './base-manager';

const ROOT = '../';

class _assetsManager extends baseManager{
    configureCommon(app) {
        const staticFolders = nconf.get('staticFolders');
        const adjustedFolders = this.adjustStaticFolders(staticFolders, app.get('root'));
        
        adjustedFolders.forEach(function(folder) {
            app.use(nconf.get('staticFolderMount'), express.static(folder, {
                maxAge: nconf.get('maxAge')
            }));
        });

    }

    constructor(){
        super();
    }

    adjustStaticFolders(folders, root) {
        const adjustedFolders = folders.map(function(folder) {
            return PATH.resolve(__dirname, ROOT, folder);
        });

        return adjustedFolders;
    }

    
};


export let assetsManager = new _assetsManager();