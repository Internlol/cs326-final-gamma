export class Database {

	private MongoClient = require('mongodb').MongoClient;
	private uri = process.env.uri;
    private client;
    private collectionName : string;
    private dbName : string = "test";

    constructor(collectionName) {
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
		(async () => {
			await this.client.connect().catch(err => { console.log(err); });
		})();
	}
	
	public async put(key: string, value: string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("put: key = " + key + ", value = " + value);
		let result = await collection.updateOne({'name' : key}, { $set : { 'value' : value} }, { 'upsert' : true } );
		console.log("result = " + result);
	}
	
	public async get(key: string) : Promise<string> {
		let db = this.client.db(this.dbName); // this.level(this.dbFile);
		let collection = db.collection(this.collectionName);
		let result = await collection.findOne({'email' : key });
		if (result) {
			return result.value;
		} else {
			return null;
		}
		}


}
