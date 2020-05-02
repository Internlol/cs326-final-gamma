export class Database {

	private MongoClient = require('mongodb').MongoClient;
	private uri;
	private secrets;	
    private client;
    // private collectionName : string;
    private dbName : string = "test";

    constructor() {
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
		(async () => {
			await this.client.connect().catch(err => { console.log(err); });
		})();
	}

	public async putExercise(name: string, desc: string, setData: Array<any>){
		let db = this.client.db(this.dbName);
		let collection = db.collection("exercises");
		let result = await collection.updateOne({'name': name}, { $set : { 'desc':desc, 'setData': setData}}, {'upsert': true});
	}

	public async getExercise(name: string) : Promise<string> {
		let db = this.client.db(this.dbName);
		let collection = db.collection("exercises");
		let result = await collection.findOne({'name' : name});
		if (result) {
			return result;
		}
		return null;
	}

	public async getAllExercise() : Promise<Array<any>> {
		let db = this.client.db(this.dbName);
		let collection = db.collection("exercises");
		var result = await collection.find({});
		let readArr = [];
		while(await result.hasNext()) {
			const doc = await result.next();
			readArr.push(doc);
		  }
		return readArr;
	}

	public async deleteExercise(name: string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection("exercises");
		var result = await collection.deleteOne({'name': name});
		console.log(result);
	}

}
