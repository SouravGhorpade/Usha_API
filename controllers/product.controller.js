const { product } = require("../models/product.model");
const { prodHistory } = require("../models/product.model");
// const { commonUtils } =require("../commonUtils/commonUtils");
//const User = require("../models/user.model");
const fs = require('fs');
const path = require("path");
const {
  DATA_UPDATED_
} = require("../errors");

// const aggregate = require("../models/rating.model").Comment.aggregate;
// const{Comment}=require('../models/rating.model');


exports.createFolder = async (req, res, next) => {
  fs.mkdir(path.join(__dirname, "../uploads/new"), (err) => {
    if (err) console.log(err);
  });
  next();
}

const targetFile = path.join(__dirname, "../uploads/new");

async function saveFile(id, files) {
  JSON.stringify(id);
  id = id.toString();
  fs.rename(targetFile, path.join(__dirname, "../uploads/" + id), (err) => {
    if (err) console.log(err);
  });
  // console.log(files);
  var images = files.map((file) => path.join(__dirname, "../uploads/" + id) + "/" + file.filename);
  await product.findByIdAndUpdate(id, { images: images });
  return;
}

exports.createProduct = async (req, res) => {
  try {
    // Create a Profile
    console.log(req.files);

    let payload = new product({
      Name: req.body.Name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category,
      // rating: req.body.rating,
      // totalRatings: req.body.totalRatings
    });
    await payload.save((err, result) => {
      if (err) console.log(err);
      saveFile(result._id, req.files);
    });

    res.status(200).json({
      status: true,
      data: payload,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err,
      status: false,
    })
  }

}

exports.getProducts = async (req, res) => {
  var data = await product.find({});
  console.log(data);
  res.status(201).json();
}

exports.buyProduct = async (req, res) => {

  try {
    const productId = req.params.productId;

    let productData = new prodHistory({
      productId: productId,
      userId: req.body.User,
      // rating: Number(req.body.rating)
    });    
    
    console.log(getAverage(productId))

    prodHistory.aggregate([
      { $group: { _id: productId, average: { $avg: '$rating' } } }
    ], function (err, result) { return result[0].average });

    // await product.findByIdAndUpdate(product,{rating : averageRating});

    res.status(200).json({
      status: true,
      data: productData
    })

  } catch (err) {

    res.status(500).json({
      error: err,
      status: false,
    })

  }
}

function getAverage(productId) {
  prodHistory.aggregate([
    { $group: { _id: productId, average: { $avg: '$rating' } } }
  ], function (err, result) 
  {
    if (err) {
    console.log(err);
}       
    console.log(result);
    return result.average;
    
    
 });

}




