const User = require("../models/user");

exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        });
    }

    const user = new User({
        id: req.body.id,
        name:req.body.name,
        password: req.body.password,
        email:req.body.email
        
    });

    User.create(user,(err,data)=>{
        if(err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
        });
        else res.send(data);
    });
};


exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user with id " + req.params.userId
            });
          }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                message: "Error updating user with id " + req.params.userId
                });
            }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete user with id " + req.params.userId
            });
          }
        } else res.send({ message: `user was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all user."
          });
        else res.send({ message: `All user were deleted successfully!` });
    });

};