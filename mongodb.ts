export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private client;
    private collectionName : string;
    private dbName : string = "test";

    constructor(collectionName) {
		this.collectionName = collectionName;
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

}
