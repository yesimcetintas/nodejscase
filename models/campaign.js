const mongoose = require("mongoose")
const Schema = mongoose.Schema

const campaignSchema = new Schema({
    type: {
        type: String
    },
    buyCount:{
        type: Number
    },
    campaignCount:{
        type: Number
    },
    author:{
        type: String
    },
    category_id:{
        type: Number
    },
    discountRate:{
        type: Number
    },
    orderTotalAmount:{
        type: Number
    }
}, {timestamps: true})

const Campaign = mongoose.model("Campaign", campaignSchema)
module.exports = Campaign