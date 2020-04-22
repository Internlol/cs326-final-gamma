import { Hash } from "crypto";

let http = require('http');
let url = require('url');
let express = require('express');
let encrypt = require('md5');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
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
	    this.server.use('/', express.static('./html'));
        this.server.use(express.json());

        // let users = [];
        // this.router.get('/users', (request, response) => {response.json(users)});

        this.router.post('/register', this.registerHandler.bind(this));
        this.router.post('/login', this.loginHandler.bind(this));
    }

    public listen(port) : void  {
        this.server.listen(port);
    }



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
