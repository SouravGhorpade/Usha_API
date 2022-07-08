const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Category = db.category;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isVeg = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Category.find(
      {
        _id: { $in: user.category }
      },
      (err, category) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i <category.length; i++) {
          if (category[i].name === "Veg") {
            

            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Veg category!" });
        return;
      }
    );
  });
};

isNon_Veg = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Category.find(
      {
        _id: { $in: user.category }
      },
      (err, category) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < category.length; i++) {
          if (category[i].name === "Non_Veg") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Non_Veg Category" });
        return;
      }
    );
  });
};

isPremix = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Category.find(
      {
        _id: { $in: user.category }
      },
      (err, category) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < category.length; i++) {
          if (category[i].name === "Premix") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Premix Category" });
        return;
      }
    );
  });
};

isChuteny = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Category.find(
      {
        _id: { $in: user.category }
      },
      (err, category) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < category.length; i++) {
          if (category[i].name === "Chuteny") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Chuteny Category" });
        return;
      }
    );
  });
};



const authJwt = {
  verifyToken,
  isVeg,
  isNon_Veg,
  isPremix,
  isChuteny

};
module.exports = authJwt;
