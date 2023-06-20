// imports
const server = require("./src/server");
////////////////////////////////////////////////

// globals
global.DEBUG = true;
global.STYLE =
  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">';

////////////////////////////////////////////////

////////////////////////////////////////////////
// listeners
// listening for activity on localhost:3000
server.start();
