const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const app = express();
const router = require("./routes/product.routes");
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Category = require("./models/Category.model");
//const category = db.category;
db.mongoose
  .connect(`mongodb://localhost:27017/project1_shop`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("conneceted successfully to mongoDB"))
  .catch(err => console.log(err))
  mongoose.Promise = global.Promise;
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("SIGHUP", cleanup);
  if (app) {
    app.set("mongoose", mongoose);
}
function cleanup() {
mongoose.connection.close(function () {
    process.exit(0);
});
}
  // .then(() => {
  //   console.log("Successfully connect to MongoDB.");
  //   initial();
  // })
  // .catch(err => {
  //   console.error("Connection error", err);
  //   process.exit();
  // });
function cleanup() {
  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Category({
        name: "Veg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Veg' to category collection");
      });
      new Category({
        name: "Non_Veg"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Non_Veg' to category collection");
      });
      new Category({
        name: "Premix"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Premix' to category collection");
      });
      new Category({
        name: "Chuteny"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Chuteny' to category collection");
      });
    }
  });
}
var corsOptions = {
  origin: "http://localhost:7001"
};
// const ProductRoute =require('./routes/product.routes');
// app.use('/products', ProductRoute);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jwt application." });
});
app.use("/",router);
//require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
