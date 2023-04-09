const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    cart:[
        {
            product_id: Number,
            product_count: Number,
            title: String,
            category_title: String,
            author: String,
            list_price: Number
        }
    ],
    shippingCost:{
        type: Number
    },
    totalPrice: {
        type: Number
    },
    totalPriceWithoutDiscount:{
        type: Number
    },
    campaign:
        {
            discountType: String,
            id: String,
            discount: Number
        },
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order