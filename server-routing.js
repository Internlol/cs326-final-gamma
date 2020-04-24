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
let http = require('http');
let url = require('url');
let express = require('express');
let encrypt = require('md5');
class MyServer {
    constructor(db) {
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        this.arr = [{ name: "pushups", desc: "some pushups", setData: [{ 'repCount': '12', 'setLength': '', 'restTime': '30' }] }, { name: "squats", desc: "some squats", setData: [{ 'repCount': '12', 'setLength': '', 'restTime': '30' }] }];
        this.theDatabase = db;
        // from https://enable-cors.org/server_expressjs.html
        this.router.use((request, response, next) => {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.server.use('/', express.static('./public'));
        this.server.use(express.json());
        // let users = [];
        // this.router.get('/users', (request, response) => {response.json(users)});
        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/login', this.loginHandler.bind(this));
        // create
        this.router.post('/users/exercises/create', this.createExerciseHandler.bind(this));
        // read
        this.router.post('/users/exercises/readOne', this.readOneExerciseHandler.bind(this));
        // read all
        this.router.post('/users/exercises/readAll', this.readAllExercisesHandler.bind(this));
        //
        this.router.post('/users/exercises/update', this.updateExerciseHandler.bind(this));
        this.router.post('/users/exercises/delete', this.deleteExerciseHandler.bind(this));
        // edit
        this.router.post('/users/exercises/edit', this.editExerciseHandler.bind(this));
        this.server.use('/', this.router);
    }
    listen(port) {
        this.server.listen(port);
    }
    createExerciseHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // NAME
            // DESCRIPTION
            // LIST OF SETS (JSON)
            yield this.createExercise(request.body.name, request.body.desc, request.body.setData, response);
        });
    }
    readOneExerciseHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readOneExercise(request.body.name, response);
        });
    }
    readAllExercisesHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readAllExercises(request.body.name, response);
        });
    }
    updateExerciseHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // NAME
            // DESCRIPTION
            // LIST OF SETS (JSON)
            yield this.updateExercise(request.body.name, request.body.desc, request.body.setData, response);
        });
    }
    deleteExerciseHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteExercise(request.body.name, response);
        });
    }
    editExerciseHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.editExercise(request.body.name, response);
        });
    }
    createExercise(name, desc, setData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put();
            this.arr.push({ name: name, desc: desc, setData: setData });
            response.write(JSON.stringify({ 'result': 'created', 'name': name }));
            response.end();
        });
    }
    readOneExercise(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // dummy data
            // let value = await this.theDatabase.get(name);
            var temp = {};
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].name == name) {
                    temp = this.arr[i];
                    break;
                }
            }
            response.write(JSON.stringify(temp));
            response.end();
        });
    }
    readAllExercises(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // dummy data
            // let value = await this.theDatabase.get(name);
            response.write(JSON.stringify(this.arr));
            response.end();
        });
    }
    updateExercise(name, desc, setData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // currExercise =
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].name == name) {
                    this.arr[i] = ({ name: name, desc: desc, setData: setData });
                    break;
                }
            }
            response.write(JSON.stringify({ 'result': 'updated', 'name': name }));
            response.end();
        });
    }
    deleteExercise(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            var temp = [];
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].name != name) {
                    temp.push(this.arr[i]);
                }
            }
            this.arr = temp;
            response.write(JSON.stringify({ 'result': 'deleted', 'name': name }));
            response.end();
        });
    }
    editExercise(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // dummy data
            // let value = await this.theDatabase.get(name);
            response.write(JSON.stringify(this.arr));
            response.end();
        });
    }
    registerHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hashedPW = yield encrypt.hash(request.body.password, 10);
                let user = { email: request.body.email, password: hashedPW };
                // now oush/send user to db
                // SEND CODE GOES HERE
                yield this.theDatabase.put(request.body.email, hashedPW);
                response.status(200).send(); // Successful
                //redirect to login page
            }
            catch (_a) {
                response.status(500).send(); // Error
            }
        });
    }
    loginHandler(request, response, users) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = users.get(request.body.email);
            if (user == null) {
                return response.status(400).send("User not found.");
            }
            try {
                if ((yield encrypt.hash(request.body.password, 10)) === encrypt.hash(user.password, 10)) {
                    response.send("Successful Login");
                }
                else {
                    response.send("Unsuccessful Login");
                }
            }
            catch (_a) {
                response.status(500).send();
            }
        });
    }
}
exports.MyServer = MyServer;
