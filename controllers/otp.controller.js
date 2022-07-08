const User = require("../models/user.model");
const product = require('../models/product.model');
//const cart = require('../models/cart.model');
const Cart = require('../models/Cart');
// const product = require('../models/Cart');

// const jwt = require("jsonwebtoken");

const {
  PHONE_NOT_FOUND_ERR,

  PHONE_ALREADY_EXISTS_ERR,

  USER_NOT_FOUND_ERR,

  INCORRECT_OTP_ERR
  
} = require("../errors");

const { generateOTP, fast2sms } = require("../utils/otp.util");
// const { product } = require("../models");
const { findById } = require("../models/Cart");


// --------------------- create new user ---------------------------------

exports.createNewUser = async (req, res, next) => {
  try {
    let { Name, Email, password, confirmPassword, Phone_No, Address, Pincode, City, State, userId} = req.body;

    if (req.body.password !== req.body.confirmPassword) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    // check duplicate phone Number
    const phoneExist = await User.findOne({Name, Email, password, confirmPassword, Phone_No, Address, Pincode, City, State });

    if (phoneExist) {
      res.status(400). send ({message: PHONE_ALREADY_EXISTS_ERR });
      return;
        return;
    }


    // create new user
    const createUser = new User({
      Name,
      Email,
      password,
      confirmPassword,
      Phone_No,
      Address,
      Pincode,
      City,
      State
    });

    // save user

    const user = await createUser.save();

    if(user){
      res.status(200).json({
      type: "success",
      message: "Account created OTP sended to mobile number",
      data: {
        userId: user._id,
      }
    });
    }
    

    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    await user.save();
    // send otp to phone number
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: user.Phone_No,
      },
      next
    );
  } catch (error) {
    console.log(error);
  }
};



// ------------ login with phone otp ----------------------------------

exports.loginWithPhoneOtp = async (req, res, next) => {
  try {

    const { Phone_No } = req.body;
    const user = await User.findOne({ Phone_No });

    if (!user) {
        res.status(400). send ({message: PHONE_NOT_FOUND_ERR});
        return;
    }

    res.status(201).json({
      type: "success",
      message: "OTP sended to your registered phone number",
      data: {
        userId: user._id,
      },
    });

    // generate otp
    const otp = generateOTP(6);
    // save otp to user collection
    user.phoneOtp = otp;
    user.isAccountVerified = true;
    await user.save();
    // send otp to phone number
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: user.Phone_No,
      },
      next
    );
  } catch (error) {
    console.log(error);
  }
};

// ---------------------- verify phone otp -------------------------

exports.verifyPhoneOtp = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    const user = await User.findById(userId);
  
    if (!user) {
        res.status(400). send ({message: USER_NOT_FOUND_ERR});
        return;
    }

    if ( user.phoneOtp !== otp) {
        res.status(400). send ({message: INCORRECT_OTP_ERR});
        return;
   }
    
   user.phoneOtp === "";
    await user.save();

    res.status(201).json({
      type: " Success",
      message: "OTP is verified successfully",
      data: {
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
//----------------------   get list of products  ----------------------------
exports.GetlistofProducts = async (req, res) => {
  try {
  categroyFetched = []
  productsFecthed =[]
  await Category.find({category:req.body.category._id})
      .then(category => {
          categroyFetched = category.map(category => {
              return{
                  name: category.name, 
                  id: category._id
              }
          })

          return category = {
              count: categroyFetched.length,
              name: categroyFetched
          }
      })
     .then(async()=>{
      await productModel.find({category: categroyFetched.id})
      .then(products => {

          productsFecthed = products.map(product => {
              return product
          })

      })

     })
     .catch(err => {
      console.log('err', err)
  })

  res.status(200).json({
      category, productsFecthed
  })
} catch (error) {
  console.log(error);
}

}

// exports.rateProduct = async (req, res)=>{
//   const id = req.params.productId;
//   // const rate = req.body.rate;
//   const { rating, totalRatings } = await product.findById(id);
//   var ratingTotal = rating * totalRatings;
//   ratingTotal = rating + Number(req.body.rating);
//   ratingTotal = (rating)/(totalRatings+1);
//   ratingTotal = Math.round(rating * 10) / 10;
//   await product.findByIdAndUpdate(id,{rating : ratingTotal, totalRatings : totalRatings + 1});
//   res.status(200).json();
// }

  // -----------------------------  add to cart product  ----------------------------------

  exports.addItemToCart = async (req,res)=>{
    var total = req.body.quantity * req.body.price;
    console.log(total);
    const userData = await Cart.findById(req.body.userId); 
    //         userData.subTotal += total;
    //        //cartData.productId.push(req.body.productId);
    //         userData.productId = req.user.product_id;
    //         userData.itmes.push(product);
    //         userData.save();
    //         res.redirect("/carts");
    //  }catch (error) {
    //   console.log(error);
    // }
    const data = await Cart.findByIdAndUpdate(req.body.userId,req.body.productId);
    res.status(200).json({
      data: {
        userId: req.body.userId,
        productId: req.body.productId,
        subTotal: req.body.subTotal
      },
     
    })
  }

