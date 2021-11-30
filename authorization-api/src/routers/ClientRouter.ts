import * as express from 'express';
import {Client, IClientModel} from '../models/client';

let clientRouter = express.Router();

clientRouter.get('/:id', (req, res) =>{
    Client.find({id: req.params.id}, function(err, Client){
         if(err){
             res.json({info: 'error finding Client', error: err}); 
         };
         if(Client){
             res.json({data: Client});
         }
    });
});


clientRouter.post('/', (req,res, next) =>{
    let client = req.body;
 
    Client.findOneAndUpdate({name: client.name}, client, {new: true, upsert: true, setDefaultsOnInsert: true}, function(err, _client){
         if(err){
               res.json({info: 'error during adding Client', error: err});
         }
         else{
             res.json({info: 'Client added successfully', data: _client});
         }
    });
});

export = clientRouter;