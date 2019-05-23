const Purchase = require('../models/Purchase')
const Ad = require('../models/Ad')

class ApproveController {
  async store (req, res) {
    const purchase = await Purchase.findById(req.params.id)
    const ad = await Ad.findByIdAndUpdate(
      purchase.ad,
      {
        purchasedBy: purchase.author
      },
      { new: true }
    )

    return res.json(ad)
  }
}

module.exports = new ApproveController()
