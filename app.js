const express = require("express")
const mongoose = require("mongoose")
const orderRoutes = require("./routes/orderRoutes")
const campaignRoutes = require("./routes/campaignRoutes")
const seedProducts = require("./products.json")
const Product = require("./models/product")

const app = express()
app.use(express.json())

const dbURL = "mongodb+srv://yesim:1234@cluster0.3ehb8a8.mongodb.net/case?retryWrites=true&w=majority"
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))

Product.deleteMany({}).then(function(){
    console.log("Data deleted"); 
}).catch(function(error){
    console.log(error);
});
Product.insertMany(seedProducts)

app.use(orderRoutes)
app.use(campaignRoutes)
