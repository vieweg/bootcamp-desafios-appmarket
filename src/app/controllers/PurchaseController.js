const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')

const purchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const purchases = await Purchase.find().populate(['author', 'ad'])
    return res.json(purchases)
  }

  async store (req, res) {
    const { ad, content } = req.body
    const user = await User.findById(req.userId)

    const adPurchase = await Ad.findById(ad).populate('author')

    if (!adPurchase.purchasedBy) {
      const purchase = await Purchase.create({
        ...req.body,
        author: req.userId
      })

      Queue.create(purchaseMail.key, {
        ad: adPurchase,
        user,
        content
      })
        .attempts(3)
        .save()

      return res.json(purchase)
    }
    return res.status(400).json({ error: 'Item já foi vendido' })
  }

  async destroy (req, res) {
    await Purchase.findByIdAndDelete(req.params.id)
    return res.status(200).json({ msg: 'Item removido' })
  }
}

module.exports = new PurchaseController()
