const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    product_id:{
        type: Number
    },
    title:{
        type: String
    },
    category_id:{
        type: Number
    },
    category_title:{
        type: String
    },
    author:{
        type: String
    },
    list_price:{
        type: Number
    },
    stock_quantity:{
        type: Number
    }
})

const Product = mongoose.model("Product",productSchema)
module.exports = Product