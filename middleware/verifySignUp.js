const db = require("../models");
const CATEGORY = db.CATEGORY;
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    Name: req.body.Name
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Name is already in use!" });
      return;
    }
    // Email
    User.findOne({
      Email: req.body.Email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};
checkCategoryExisted = (req, res, next) => {
  if (req.body.category) {
    for (let i = 0; i < req.body.category.length; i++) {
      if (!CATEGORY.includes(req.body.category[i])) {
        res.status(400).send({
          message: `Failed! CATEGORY ${req.body.category[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkCategoryExisted
};
module.exports = verifySignUp;
