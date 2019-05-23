const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Ad = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase',
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

Ad.remove(function (err, ad) {
  if (err) return console.log(err)
  Ad.findById(ad._id, function (err, ad) {
    console.log(err, ad) // null
  })
})

Ad.plugin(mongoosePaginate)

module.exports = mongoose.model('Ad', Ad)
