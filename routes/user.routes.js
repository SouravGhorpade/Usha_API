const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const Cart = require("../controllers/otp.controller");
//const cart = require("../models/cart.model");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", 
  function(req, res) {
  controller.allAccess
  });
  app.get("/api/test/user",
  function(req, res) {
   [authJwt.verifyToken], controller.userBoard
  });
  app.get(
    "/api/test/Non_Veg",
    function(req, res) {
    [authJwt.verifyToken, authJwt.isNon_Veg],
    controller.Non_VegBoard
    });
  app.get(
    "/api/test/Veg", function(req, res) {
    [authJwt.verifyToken, authJwt.isVeg],
    controller.VegBoard
    });
  app.get(
      "/api/test/Premix", function(req, res) {
      [authJwt.verifyToken, authJwt.isPremix],
      controller.PremixBoard
      }); 
  app.get(
        "/api/test/Chuteny", function(req, res) {
        [authJwt.verifyToken, authJwt.isChuteny],
        controller.ChutenyBoard
        }); 

  app.get("/cart", function(req, res) {
          Cart.userData
            }); 
  };
    
  
    

