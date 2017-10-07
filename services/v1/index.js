const Router = require('koa-router')
const router = new Router()

require('./public').register(router)
require('./todo').register(router)

module.exports = router.middleware()