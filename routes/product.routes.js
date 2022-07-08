
const otpController = require("../controllers/otp.controller");
//const productController = require("../controllers/product.controller");
const productController = require('../controllers/product.controller');
const express = require('express')
const productRoutes = express.Router()

const productModel = require('../models/product.model')
//const category = require('../models/Category.model')
const { category } = require('../models')
const Category = require('../models/Category.model')
// const { Comment } = require('../models')
// const Comments = require('../models/rating.model')
const multer = require("multer");

productRoutes.get('', async (req, res) => {
    categroyFetched = []
    productsFecthed =[]
    await Category.find({})
        .then(category => {
            categroyFetched = Category.map(category => {
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
        await productModel.find({category: categroyFetched.id},{Comment: req.body.Comment})
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

})


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/new")
    }
})

const upload = multer({
    storage : storage
})
// const router = express.Router()

productRoutes.post("/create",productController.createFolder,upload.array("images"),productController.createProduct);

// productRoutes.post('/rate/:productId', otpController.rateProduct);

productRoutes.post('/createProduct', productController.createProduct);

productRoutes.get("/getProduct", productController.getProducts);

productRoutes.get('/buy/:productId', productController.buyProduct);

// productRoutes.post('/buy/:productId', productController.buyProduct);

module.exports = productRoutes;