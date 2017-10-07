/**
 * Created by cc on 2017/8/2.
 */
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const createBody = require('./createBody')

async function getAll(ctx) {
  const todos = await dataProvider.Todo.findAll()
  ctx.body = createBody(todos)
}

exports.register = function (router) {
  router.post('/todo/list', getAll)
}