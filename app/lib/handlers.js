/*
 * Request handlers
 */

// Dependencies

// Define the handlers
var handlers = {};

// Users handlers
handlers.users = function (data, callback) {
  var acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    // method not allowed
    callback(405);
  }
  // Callback a http status code, and a pyaload object
  callback(406, { name: "sample handler" });
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function (data, callback) {
  var firstName =
    typeof data.payload.firstName === "string" &&
    data.paylaod.firstName.length.trim() > 0
      ? data.paylaod.firstName.length.trim()
      : false;
  var lastName =
    typeof data.payload.lastName === "string" &&
    data.paylaod.lastName.length.trim() > 0
      ? data.paylaod.lastName.length.trim()
      : false;
  var phone =
    typeof data.payload.phone === "string" &&
    data.paylaod.phone.length.trim() > 0
      ? data.paylaod.phone.length.trim()
      : false;
  var password =
    typeof data.payload.password === "string" &&
    data.paylaod.password.length.trim() > 0
      ? data.paylaod.password.length.trim()
      : false;
  var tosAgreement =
    typeof data.payload.tosAgreement === "boolean" &&
    data.paylaod.tosAgreement === true
      ? true
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // Make sure that the user doesnt already exist
  } else {
    callback(400, { Error: "Missing required fields" });
  }
};

// Users - get
handlers._users.get = function (data, callback) {};

// Users - put
handlers._users.put = function (data, callback) {};

// Users - delete
handlers._users.delete = function (data, callback) {};

// Simple handlers
handlers.sample = function (data, callback) {
  // Callback a http status code, and a pyaload object
  callback(406, { name: "sample handler" });
};

// ping handlers
handlers.ping = function (data, callback) {
  // Callback a http status code, and a pyaload object
  callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Export the module
module.exports = handlers;
