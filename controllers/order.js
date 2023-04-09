const Product = require("../models/product")
const Order = require("../models/order")
const Campaign = require("../models/campaign")

fetchProduct = async (productId) => {
    return Product.findOne({product_id: productId}).then(result=>result);
};

fetchCampaign = async () => {
    return Campaign.find().then(result=>result)
}

const order_index = (req,res) => {
    Order.find().sort({createAt: -1})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const order_add = async (req,res) => {
    const orderList = req.body
    
    let totalPrice = 0
    let discountPrice = {
        byCount: 0,
        byRate: 0
    };

    let tempByCountCampaign = {}
    let tempByRateCampaign = {}
    const campaigns = await fetchCampaign()

    for(let i=0; i<orderList.cart.length; i++){
        const orderItem =   orderList.cart[i]
        if(!Number.isInteger(orderItem.product_id)) {
            return res.status(400).send(`${orderItem.product_id} id'li ürün bulunamadı.`);
        }
    
        if(!Number.isInteger(orderItem.product_count)) {
            return res.status(400).send(`${orderItem.product_count} id'li ürün bulunamadı.`);
        }

        const product =  await fetchProduct(orderItem.product_id)
        if(!product) {
            return res.status(404).send(`${orderItem.product_id} id'li ürün bulunamadı.`)
        }
        if (orderItem.product_count > product.stock_quantity) {
            return res.status(400).send('stok yeterli değil');
        }

        totalPrice = totalPrice + (orderItem.product_count * product.list_price)

        calculateDiscountPrice(campaigns, orderItem, product, discountPrice, tempByCountCampaign, totalPrice, tempByRateCampaign);

        setCartTitle(orderItem, product);
    }
    
    totalPrice = applyDiscount(discountPrice, totalPrice, tempByRateCampaign, orderList, tempByCountCampaign);

    setShippingCost(totalPrice, orderList);

    setTotalPrices(orderList, totalPrice);

    createOrder(orderList, res);
}


function setCartTitle(orderItem, product) {
    orderItem.title = product.title;
    orderItem.category_title = product.category_title;
    orderItem.author = product.author;
    orderItem.list_price = product.list_price;
}

function setTotalPrices(orderList, totalPrice) {
    orderList.totalPrice = totalPrice + orderList.shippingCost;
    orderList.totalPriceWithoutDiscount = totalPrice + orderList.shippingCost + orderList.campaign.discount;
}

function setShippingCost(totalPrice, orderList) {
    if (totalPrice >= 150) {
        orderList.shippingCost = 0;
    } else {
        orderList.shippingCost = 35;
    }
}

function createOrder(orderList, res) {
    const createOrder = new Order(orderList);

    const result = createOrder.save()
        .then(
            console.log("Başarılı şekilde kayıt edildi.")
        )
        .catch((err) => console.log(err)
        );
    res.send(result);
}

function applyDiscount(discountPrice, totalPrice, tempByRateCampaign, orderList, tempByCountCampaign) {
    if (discountPrice.byRate >= discountPrice.byCount) {
        totalPrice = totalPrice - discountPrice.byRate;
        tempByRateCampaign.discount = discountPrice.byRate;
        tempByRateCampaign.discountType = "rate";
        orderList.campaign = tempByRateCampaign;
    } else {
        totalPrice = totalPrice - discountPrice.byCount;
        tempByCountCampaign.discount = discountPrice.byCount;
        tempByCountCampaign.discountType = "count";
        orderList.campaign = tempByCountCampaign;
    }
    return totalPrice;
}

function calculateDiscountPrice(campaigns, orderItem, product, discountPrice, tempByCountCampaign, totalPrice, tempByRateCampaign) {
    for (let j = 0; j < campaigns.length; j++) {
        if (campaigns[j].type === "count" && orderItem.product_count >= campaigns[j].buyCount && product.category_id === campaigns[j].category_id && product.author === campaigns[j].author) {
            let tempDiscountPrice = orderItem.list_price * campaigns[j].campaignCount;

            if (tempDiscountPrice > discountPrice.byCount) {
                discountPrice.byCount = tempDiscountPrice;
                tempByCountCampaign.id = campaigns[j]._id.toString();
            }
        }
        if (campaigns[j].type === "rate" && totalPrice >= campaigns[j].orderTotalAmount) {
            const tempDiscountRateByPrice = (totalPrice * campaigns[j].discountRate) / 100;
            if (tempDiscountRateByPrice > discountPrice.byRate) {
                discountPrice.byRate = tempDiscountRateByPrice;
                tempByRateCampaign.id = campaigns[j]._id.toString();
            }
        }
    }
}

module.exports = {
    order_add,
    order_index
}
