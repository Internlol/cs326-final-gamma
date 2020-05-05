import { Hash } from "crypto";

let http = require('http');
let url = require('url');
let express = require('express');
let encrypt = require('md5');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private router = express.Router();

    constructor(db) {
        this.theDatabase = db;
        // from https://enable-cors.org/server_expressjs.html
        this.router.use((request, response, next) => {
            response.header('Content-Type','application/json');
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

        this.server.use('/', this.router);
    }

    public listen(port) : void  {
        this.server.listen(port);
    }

    // Exercise Handlers //
    private async createExerciseHandler(request, response) : Promise<void> {
        await this.createExercise(request.body.name, request.body.desc, request.body.setData, response);
    }
    private async readOneExerciseHandler(request, response) : Promise<void> {
        await this.readOneExercise(request.body.name, response);
    }
    private async readAllExercisesHandler(request, response) : Promise<void> {
        await this.readAllExercises(request.body.name, response);
    }

    private async updateExerciseHandler(request, response) : Promise<void> {
        await this.updateExercise(request.body.name, request.body.desc, request.body.setData, response);
    }

    private async deleteExerciseHandler(request, response) : Promise<void> {
        await this.deleteExercise(request.body.name, response);
    }
    // End Exercise Handlers //

    // Workout Handlers //
    private async createWorkoutHandler(request, response) : Promise<void> {
        await this.createWorkout(request.body.name, request.body.exerciseData, response);
    }
    // End Workout Handlers //

    // Exercise CRUD //
    public async createExercise(name: string, desc: string, setData: Array<any>, response): Promise<void>{
        await this.theDatabase.putExercise(name, desc, setData);
        response.write(JSON.stringify({'result' : 'created', 'name' : name}));
        response.end();
    }
    
    public async readOneExercise(name: string, response): Promise<void> {
        let value = await this.theDatabase.getExercise(name);
        response.write(JSON.stringify(value));
        response.end();
    }

    public async readAllExercises(name: string, response): Promise<void> {
        let value = await this.theDatabase.getAllExercise();
        response.write(JSON.stringify(value));
        response.end();
    }

    public async updateExercise(name: string, desc: string, setData: Array<any>, response): Promise<void>{
        await this.theDatabase.putExercise(name, desc, setData);
        response.write(JSON.stringify({'result' : 'updated', 'name' : name}));
        response.end();
    }

    public async deleteExercise(name: string, response): Promise<void> {
        await this.theDatabase.deleteExercise(name);
        response.write(JSON.stringify({'result' : 'deleted', 'name' : name}));
        response.end();
    }
    // End Exercise CRUD //

    // Workout CRUD //
    public async createWorkout(name: string, exerciseData: Array<any>, response): Promise<void>{
        // await this.theDatabase.putExercise(name, desc, setData);
        response.write(JSON.stringify({'result' : 'created', 'name' : name}));
        response.end();
    }
    // End Workout CRUD //

    private async registerHandler(request, response) : Promise<void> {
        try {
            let hashedPW = await encrypt.hash(request.body.password, 10);
            let user = { email: request.body.email, password: hashedPW};

            // now oush/send user to db
            // SEND CODE GOES HERE
            await this.theDatabase.put(request.body.email, hashedPW);

            response.status(200).send(); // Successful
            //redirect to login page
        }
        catch {
            response.status(500).send(); // Error
        }
    }

    private async loginHandler(request, response, users) : Promise<void> {
        let user = users.get(request.body.email);
        if (user == null) {
            return response.status(400).send("User not found.");
        }
        try {
            if (await encrypt.hash(request.body.password, 10) === encrypt.hash(user.password, 10)) {
                response.send("Successful Login");
            }
            else {
                response.send("Unsuccessful Login");
            }
        }
        catch {
            response.status(500).send();
        }
    }



}
