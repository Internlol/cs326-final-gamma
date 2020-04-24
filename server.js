'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("./mongodb");
const server_routing_1 = require("./server-routing");
const theDatabase = new mongodb_1.Database('test'); // CHANGE THIS
const theServer = new server_routing_1.MyServer(theDatabase);
theServer.listen(8080);
