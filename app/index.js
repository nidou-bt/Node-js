// Dependencies
var http = require("http");
var url = require("url");
// to show an object inside terminal log
var util = require("util");

// the server should respond to all requests with a string
var server = http.createServer(function (req, res) {
  // Get the url and parse it
  var parsedUrl = url.parse(req.url, true);

  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  var method = req.method.toLowerCase();

  // Get the feaders as an object
  var headers = req.headers;

  // Send the response
  res.end("Hello World\n");

  var logBody = {
    path: trimmedPath,
    method,
    "query string parameters": queryStringObject,
    headers,
  };

  // Log the request path
  console.log(
    "Request received" +
      util.inspect(logBody, { showHidden: false, depth: null, colors: true })
  );
});

// Start the server, and have it listen on port 3001
server.listen(3001, function () {
  console.log("the server is listening on port 3001 now");
});
