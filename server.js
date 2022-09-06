const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(express.json());

app.use(express.static('public'))
// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//use cors
app.use(cors())

// a route for home page
app.get("/home", (req, res) => {
  
  res.send({ message: "NodeJs CRUD Application" })
});
const user = require("./app/controllers/user");
    // Create a new employee
app.post("/users", user.create);
  
    // Retrieve all user
app.get("/users", user.findAll);
  
    // Retrieve a single employee with employeeId
app.get("/users/:userId", user.findOne);
  
    // Update a employee with employeeId
app.put("/users/:userId", user.update);
  
    // Delete a employee with employeeId
app.delete("/users/:usersId", user.delete);
  
    // Create a new employee
app.delete("/users", user.deleteAll);
  
app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.socket.remoteAddress);
  console.log(req.ip);
  res.send("your IP is: " + req.ip);
});

// setting port to 3000, & listening for requests http request.
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});