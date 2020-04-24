"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor(collectionName) {
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = process.env.uri;
        this.dbName = "test";
        this.collectionName = collectionName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        // Open up a connection to the client.
        // The connection is asynchronous, but we can't call await directly
        // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
        /* from https://anthonychu.ca/post/async-await-typescript-nodejs/

        Async/Await and the Async IIFE

        The await keyword can only be used inside of a function
        marked with the async keyword. [...] One way to do this is
        with an "async IIFE" (immediately invoked function
        expression)...

        (async () => {
        // code goes here
        })();

        */
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect().catch(err => { console.log(err); });
        }))();
    }
    put(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collectionName);
            console.log("put: key = " + key + ", value = " + value);
            let result = yield collection.updateOne({ 'name': key }, { $set: { 'value': value } }, { 'upsert': true });
            console.log("result = " + result);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName); // this.level(this.dbFile);
            let collection = db.collection(this.collectionName);
            let result = yield collection.findOne({ 'email': key });
            if (result) {
                return result.value;
            }
            else {
                return null;
            }
        });
    }
}
exports.Database = Database;
