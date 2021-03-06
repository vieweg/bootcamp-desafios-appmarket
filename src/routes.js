const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const validators = require('./app/validators')

const controllers = require('./app/controllers')

routes.get('/users', handle(controllers.UserController.index))
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware)

routes.put('/users/:id', handle(controllers.UserController.update))

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 */
routes.get('/purchases', handle(controllers.PurchaseController.index))
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)
routes.delete('/purchases/:id', handle(controllers.PurchaseController.destroy))
routes.put('/purchases/:id', handle(controllers.ApproveController.store))

module.exports = routes
