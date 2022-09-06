const sql = require("./db")

const User = function(user){
    this.id = user.id;
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

User.create = ( newUser , result)=>{
    sql.query('INSERT INTO user SET ? ',newUser,(err,res)=>{
        if(err){
            console.log('error:',err);
            result(err,null);
            return;
        }
        console.log("create sucessfully :",{id:res.insertId,...newUser});
        result(null,{id:res.insertId,...newUser});
    });
};

User.findById = (userId,result)=>{
    sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if(res.length){
            console.log("found employee : ",res[0]);
            result(null,res[0]);
            return;
        }
        result({kind:"not_found"},null);
        })
}

User.getAll = result =>{
    sql.query('SELECT * FROM user',(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(null,err);
            return;
        }
        console.log("user : ", res);
        result(null, res);
      });
    };

User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE user SET name = ?, password = ?, email = ? WHERE id = ?",
      [user.name,user.password,user.email,  id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found employee with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };

  User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found employee with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };


  User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };

  module.exports = User;