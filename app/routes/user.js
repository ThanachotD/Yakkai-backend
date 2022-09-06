module.exports = app => {
  
    const user = require("../controllers/user");
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
  };