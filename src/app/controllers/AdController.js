const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}
      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    if (req.query.text) {
      filters.$or = []
      filters.$or.push({ title: new RegExp(req.query.text, 'i') }) // insencitive case
      filters.$or.push({ description: new RegExp(req.query.text, 'i') }) // insencitive case
    }

    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      populate: ['author'],
      sort: '-createdAt'
    })

    return res.json(ads)
  }

  async show (req, res) {
    const { id } = req.params
    const ad = await Ad.findById(id)

    return res.json(ad)
  }

  async store (req, res) {
    try {
      const ad = await Ad.create({ ...req.body, author: req.userId })
      return res.json(ad)
    } catch (error) {
      return res.status(400)
    }
  }

  async update (req, res) {
    const { id } = req.params
    const ad = await Ad.findByIdAndUpdate(id, req.body, { new: true })

    return res.json(ad)
  }

  async destroy (req, res) {
    const { id } = req.params
    try {
      const ad = await Ad.findByIdAndRemove(id)

      if (!ad) return res.status(404).json({ error: 'Item não lozalizado' })

      return res.status(200).json({ msg: 'Item removido com sucesso' })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}

module.exports = new AdController()
