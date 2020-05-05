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
    constructor() {
        this.MongoClient = require('mongodb').MongoClient;
        // private collectionName : string;
        this.dbName = "test";
        if (!process.env.uri) {
            this.secrets = require('./secrets.json');
            this.uri = this.secrets.uri;
        }
        else {
            this.uri = process.env.uri;
        }
        // this.collectionName = collectionName;
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
    putWorkout(name, exerciseData) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("workouts");
            let result = yield collection.updateOne({ 'name': name }, { $set: { 'exerciseData': exerciseData } }, { 'upsert': true });
        });
    }
    getWorkout(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("workouts");
            let result = yield collection.findOne({ 'name': name });
            if (result) {
                return result;
            }
            return null;
        });
    }
    getAllWorkouts() {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("workouts");
            var result = yield collection.find({});
            let readArr = [];
            while (yield result.hasNext()) {
                const doc = yield result.next();
                readArr.push(doc);
            }
            return readArr;
        });
    }
    deleteWorkout(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("workouts");
            var result = yield collection.deleteOne({ 'name': name });
            // console.log(result);
        });
    }
    putExercise(name, desc, setData) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("exercises");
            let result = yield collection.updateOne({ 'name': name }, { $set: { 'desc': desc, 'setData': setData } }, { 'upsert': true });
        });
    }
    getExercise(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("exercises");
            let result = yield collection.findOne({ 'name': name });
            if (result) {
                return result;
            }
            return null;
        });
    }
    getAllExercise() {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("exercises");
            var result = yield collection.find({});
            let readArr = [];
            while (yield result.hasNext()) {
                const doc = yield result.next();
                readArr.push(doc);
            }
            return readArr;
        });
    }
    deleteExercise(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection("exercises");
            var result = yield collection.deleteOne({ 'name': name });
            console.log(result);
        });
    }
}
exports.Database = Database;
