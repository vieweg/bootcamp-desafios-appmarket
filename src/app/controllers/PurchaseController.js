const Ad = require('../models/Ad')
const User = require('../models/User')

const purchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body
    const user = await User.findById(req.userId)

    const adPurchase = await Ad.findById(ad).populate('author')

    Queue.create(purchaseMail.key, {
      ad: adPurchase,
      user,
      content
    })
      .attempts(3)
      .save()

    return res.send()
  }
}

module.exports = new PurchaseController()
