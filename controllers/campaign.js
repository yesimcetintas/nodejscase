const Campaign = require("../models/campaign")

const campaign_add = (req,res) => {
    const campaign = new Campaign(req.body)
    
    const result = campaign.save()
        .then(console.log("Başarılı şekilde kampanya yeni kayıt edildi."))
        .catch((err)=>
            console.log(err)
        )
        res.send(result)
}

const campaign_index = (req,res) => {
    Campaign.find().sort({createAt: -1})
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports={
    campaign_add,
    campaign_index
}