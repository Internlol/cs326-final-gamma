let http = require('http');
let url = require('url');

export class MyServer {

    private theDatabase;
    private server;

    private headerText = { "Content-Type": "application/json",
			   "Access-Control-Allow-Origin": "*",
			   "Access-Control-Allow-Headers": "*"
			 };
    
    constructor(db) {
	this.theDatabase = db;
	this.server = http.createServer();
	this.server.on('request', this.handler.bind(this));
    }

    public async handler(request, response) : Promise<void> {
        response.writeHead(200, this.headerText);
        let options = url.parse(request.url, true).query;
    }

    public listen(port) : void  {
	this.server.listen(port);
    }

}

