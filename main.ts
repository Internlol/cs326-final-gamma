'use strict';

import { Database } from './mongodb';
import { MyServer } from './server';

const theDatabase = new Database('testDB');
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
