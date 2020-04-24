'use strict';

import { Database } from './mongodb';
import { MyServer } from './server-routing';

const theDatabase = new Database('test'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT);
