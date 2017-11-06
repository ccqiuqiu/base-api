const createBody = require('./createBody')
const dataProvider = require('../../data/dataProvider')
const koaBody = require('koa-body')()

async function login(ctx) {
  const data = ctx.request.body
  const user = await dataProvider.User.getUser(data.user)
  if (user) {
    ctx.body = createBody()
    ctx.session.user = JSON.stringify(user)
  } else {
    ctx.body = createBody('', false, '用户名密码不匹配')
  }
}

async function test(ctx) {
    ctx.body = createBody('', true, '成功')
}

exports.register = function (router) {
  router.post('/public/login', koaBody, login)
  router.get('/public/test', koaBody, test)
}