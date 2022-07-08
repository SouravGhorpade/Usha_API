
const mongoose = require('mongoose');

const  ProductSchema =  mongoose.Schema({
    category:{ 
        type: String
    },  
    type :{
        type: String
    },
    Name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    } ,
    description: {
        type: String,
        trim: true,
        lowercase: true
    } ,
    quantity: {
        type: Number,
        required: true,
        trim: true,
        default:0
    } ,
    price: {
        type: Number,
        required: true,
        trim: true,
        default:0
    },
    images: [
        {
            type: String,
          } 
    ]
    // rating : {
    //     type : Number,
    //     default : 0
    // },
    // totalRatings : {
    //     type : Number,
    //     default : 0
    // }
});
exports.product = mongoose.model('Product', ProductSchema);

const productHistory = mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    // rating : {
    //     type : Number,
    //     default : 0
    // },
    // totalRatings : {
    //     type : Number,
    //     default : 0
    // }
});
exports.prodHistory = mongoose.model('productHistory',productHistory);