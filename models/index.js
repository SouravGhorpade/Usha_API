const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.product = require("./product.model");
db.Cart = require("./Cart");
db.user = require("./user.model");
db.type = require("./Category.model");
db.TYPE = ["Veg", "Non_Veg", "Premix", "Chuteny"];
module.exports = db;
