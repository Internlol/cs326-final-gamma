'use strict';

import { Database } from './mongodb';
import { MyServer } from './server-routing';

const theDatabase = new Database(); // CHANGE THIS
const theServer = new MyServer(theDatabase);

var port = process.env.PORT || 8080;
theServer.listen(port);
