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
        this.router = express.Router();
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
        // Exercises
        this.router.post('/users/exercises/create', this.createExerciseHandler.bind(this));
        this.router.post('/users/exercises/readOne', this.readOneExerciseHandler.bind(this));
        this.router.post('/users/exercises/readAll', this.readAllExercisesHandler.bind(this));
        this.router.post('/users/exercises/update', this.updateExerciseHandler.bind(this));
        this.router.post('/users/exercises/delete', this.deleteExerciseHandler.bind(this));
        // Workouts
        this.router.post('/users/workouts/create', this.createWorkoutHandler.bind(this));
        this.router.post('/users/workouts/delete', this.deleteWorkoutHandler.bind(this));
        this.router.post('/users/workouts/readOne', this.readOneWorkoutHandler.bind(this));
        this.router.post('/users/workouts/readAll', this.readAllWorkoutsHandler.bind(this));
        this.router.post('/users/workouts/update', this.updateWorkoutHandler.bind(this));
        this.server.use('/', this.router);
    }
    listen(port) {
        this.server.listen(port);
    }
    // Exercise Handlers //
    createExerciseHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.updateExercise(request.body.name, request.body.desc, request.body.setData, response);
        });
    }
    deleteExerciseHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteExercise(request.body.name, response);
        });
    }
    // End Exercise Handlers //
    // Workout Handlers //
    createWorkoutHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createWorkout(request.body.name, request.body.exerciseData, response);
        });
    }
    deleteWorkoutHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteWorkout(request.body.name, response);
        });
    }
    readOneWorkoutHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readOneWorkout(request.body.name, response);
        });
    }
    readAllWorkoutsHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readAllWorkouts(request.body.name, response);
        });
    }
    updateWorkoutHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateWorkout(request.body.name, request.body.exerciseData, response);
        });
    }
    // End Workout Handlers //
    // Exercise CRUD //
    createExercise(name, desc, setData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.theDatabase.putExercise(name, desc, setData);
            response.write(JSON.stringify({ 'result': 'created', 'name': name }));
            response.end();
        });
    }
    readOneExercise(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.theDatabase.getExercise(name);
            response.write(JSON.stringify(value));
            response.end();
        });
    }
    readAllExercises(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.theDatabase.getAllExercise();
            response.write(JSON.stringify(value));
            response.end();
        });
    }
    updateExercise(name, desc, setData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.theDatabase.putExercise(name, desc, setData);
            response.write(JSON.stringify({ 'result': 'updated', 'name': name }));
            response.end();
        });
    }
    deleteExercise(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.theDatabase.deleteExercise(name);
            response.write(JSON.stringify({ 'result': 'deleted', 'name': name }));
            response.end();
        });
    }
    // End Exercise CRUD //
    // Workout CRUD //
    createWorkout(name, exerciseData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.theDatabase.putWorkout(name, exerciseData);
            response.write(JSON.stringify({ 'result': 'created', 'name': name }));
            response.end();
        });
    }
    deleteWorkout(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.theDatabase.deleteWorkout(name);
            response.write(JSON.stringify({ 'result': 'deleted', 'name': name }));
            response.end();
        });
    }
    readOneWorkout(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.theDatabase.getWorkout(name);
            response.write(JSON.stringify(value));
            response.end();
        });
    }
    readAllWorkouts(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.theDatabase.getAllWorkouts();
            response.write(JSON.stringify(value));
            response.end();
        });
    }
    updateWorkout(name, exerciseData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.theDatabase.putWorkout(name, exerciseData);
            response.write(JSON.stringify({ 'result': 'updated', 'name': name }));
            response.end();
        });
    }
    // End Workout CRUD //
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
