const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Category = db.category;
//const Cart = db.cart;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  const user = new User({
    Name: req.body.Name,
    Phone_No:req.body.Phone_No,
    Address: req.body.Address,
    Pincode: req.body.Pincode,
    City: req.body.City,
    State: req.body.State,
    Email: req.body.Email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmPassword:bcrypt.hashSync(req.body.password, 8),
   // category: req.body.category

  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.category) {
      Category.find(
        {
          name: { $in: req.body.category }
        },
        (err, category) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.category = category.map(category => category._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Category.findOne({ name: "user" }, (err, category) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.category = [category._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
}
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("category", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (req.body.password !== req.body.confirmPassword) {
        res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
    
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.category.length; i++) {
        authorities.push("CATEGORY_" + user.category[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        Name: user.Name,
        Email: user.Email,
        category: authorities,
        accessToken: token
      });
    });
};


