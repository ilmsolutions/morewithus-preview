import * as express from 'express';
import {getConfig} from './handlers/settings';

let apiRouter = express.Router();

apiRouter.get('/configuration/:key', (req, res, next) =>{
  let metaonly = req.query.metaonly ? true : false;
  getConfig(req.params.key, metaonly, (err, result) =>{
        if(err)
        return next(err);
       return res.json(result);
  });
});


export = apiRouter;
