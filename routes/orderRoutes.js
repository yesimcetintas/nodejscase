const express  = require("express")
const router = express.Router()
const OrderController = require("../controllers/order")

router.post("/order",OrderController.order_add)
router.get("/order",OrderController.order_index)

module.exports = router