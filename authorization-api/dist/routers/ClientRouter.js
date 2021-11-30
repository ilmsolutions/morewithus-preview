"use strict";
var express = require("express");
var client_1 = require("../models/client");
var clientRouter = express.Router();
clientRouter.get('/:id', function (req, res) {
    client_1.Client.find({ id: req.params.id }, function (err, Client) {
        if (err) {
            res.json({ info: 'error finding Client', error: err });
        }
        ;
        if (Client) {
            res.json({ data: Client });
        }
    });
});
clientRouter.post('/', function (req, res, next) {
    var client = req.body;
    client_1.Client.findOneAndUpdate({ name: client.name }, client, { new: true, upsert: true, setDefaultsOnInsert: true }, function (err, _client) {
        if (err) {
            res.json({ info: 'error during adding Client', error: err });
        }
        else {
            res.json({ info: 'Client added successfully', data: _client });
        }
    });
});
module.exports = clientRouter;
//# sourceMappingURL=ClientRouter.js.map