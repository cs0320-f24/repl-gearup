import * as http from 'http'
import * as util from 'util'

/**
 * This is a trivial example of a node.js backend that returns a JSON.
 * It is run by cd'ing to the repl directory and running `node src/backend/trivial_backend.js`
 * This should start the server on localhost:3232 (according to line 23)
 */

// This is a JSON about the coolest class at Brown :) 
const informativeJson = {
  "name": "cs0320",
  "description": "Coolest Software Engineering Class In the World",
  "rating": "6/5",
  "students": ["Nim Telson", "Sicole Nanchez", "Crace Ganterella", "Jlejandro Aackson"]
}

// This function is called when a request is made to the server, it returns the JSON above.
function handle(req, res) {
  util.inspect(req)
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
  res.end(JSON.stringify(informativeJson));
};


// This starts the server then logs a message to the terminal once it is started and when
// a connection is made.
const server = http.createServer(handle);
const hostname = 'localhost'
const port = 3232
server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});

server.on('connection', info => {
  console.log(`Connection made`);
})
