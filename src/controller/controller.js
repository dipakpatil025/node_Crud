var userDB = require("../models/add_user");
const { user } = require("../routes/router");

// create ans  save user
exports.create = (req, res) => {
  // validagte requires
  if (!req.body) {
    res.status(400).send({ mesage: "Content cannot be Empty" });
    return;
  }

  // create new user DB
  const user = new userDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  // save data
  user
    .save(user)
    .then((data) => {
    //   res.send(data);
    res.redirect("/")
    })
    .catch((err) => {
      res.status(500).send({ message: err.mesage || "some error ocuure" });
    });
};

// find

exports.find = (req, res) => {

    if (req.query.id) {
        const id  =  req.query.id;
        userDB
        .findById (id)
        .then((data) => {
            if (!data) {
                res.status(400).send({message : "Not Found user"})
            }
            else{
                res.send(data);
            }

        })
        .catch((err) => {
          res.status(500).send({
            message: err.mesage || "error occure while retriving information",
          });
        });
    }
    else{
        userDB
        .find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.mesage || "error occure while retriving information",
          });
        });
    }

 
};

// Update
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "data cannot be empty" });
  }
  const id = req.params.id;

  userDB
    .findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `cannot Update user with id ${id}. mybe user not found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.update_data = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "data cannot be empty" });
  }
  const id = req.params.id;
  console.log("daoihdkjhdasdhjsa dkjha kdsaskdasdghsafhdasdaks dk");
  userDB
    .findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `cannot Update user with id ${id}. mybe user not found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
// delete
exports.delete = (req, res) => {

    const id = req.params.id;
    userDB.findByIdAndDelete(id)
    .then(data=>{
        if (!data) {
            res.status(400).send({message:`Cannot delete with ${id}. mybe id is wrong`});
        }
        else{
            res.send({
                message:"user was delete succefulyy"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message : "could not delete user "
        })
    })
};
