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

    // Choose the handler this request should go to, If one is not found, use the notFound handler

    var chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode === "number" ? statusCode : 200;
      // Use the payload called back by the handler, or default to an empty object
      payload = typeof payload === "object" ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      var logBody = {
        path: trimmedPath,
        method,
        query: queryStringObject,
        headers,
        buffer,
        statusCode,
        payloadString,
      };

      console.log(
        "Request received" +
          util.inspect(logBody, {
            showHidden: false,
            depth: null,
            colors: true,
          })
      );
    });
  });
});

// Start the server, and have it listen on port 3001
server.listen(3001, function () {
  console.log("the server is listening on port 3001 now");
});

// Define the handlers
var handlers = {};

// Simple handlers
handlers.sample = function (data, callback) {
  // Callback a http status code, and a pyaload object
  callback(406, { name: "sample handler" });
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Define a request router
var router = {
  sample: handlers.sample,
};
