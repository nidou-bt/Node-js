// Dependencies
var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
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

  // Get the payload, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    // Send the response
    res.end("Hello World\n");

    var logBody = {
      path: trimmedPath,
      method,
      query: queryStringObject,
      headers,
      buffer,
    };

    // Log the request path
    console.log(
      "Request received" +
        util.inspect(logBody, { showHidden: false, depth: null, colors: true })
    );
  });
});

// Start the server, and have it listen on port 3001
server.listen(3001, function () {
  console.log("the server is listening on port 3001 now");
});
