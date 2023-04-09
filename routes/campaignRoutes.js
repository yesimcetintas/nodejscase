const express  = require("express")
const router = express.Router()
const CampaingController = require("../controllers/campaign")

router.post("/campaign",CampaingController.campaign_add)
router.get("/campaign",CampaingController.campaign_index)

module.exports = router