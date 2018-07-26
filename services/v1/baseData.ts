/**
 * Created by 熊超超 on 2018/6/21.
 */
import createBody from './createBody'
import * as Dao from '../../data/dao'

async function getOptions(ctx) {
  const {code, type} = ctx.request.query
  let options: any = ''
  switch (code) {
    case 'menuTree':
      options = await Dao.Menu.findTrees()
      break
    case 'role':
      const roles = await Dao.Role.find()
      options = {
        columns: [
          {prop: 'name', label: '角色名'},
          {prop: 'code', label: '角色编码'},
        ],
        rows: roles
      }
      break
    case 'resource':
      const res = await Dao.Resource.find()
      options = {
        columns: [
          {prop: 'id', label: 'ID'},
          {prop: 'name', label: '名称'},
          {prop: 'code', label: '代码'},
          {prop: 'url', label: 'URL', width: '160px'},
        ],
        rows: res
      }
      break
  }
  ctx.body = createBody(options)
}
async function searchPage(ctx) {
  const params = ctx.request.body
  const re = await Dao.Page.findPaged(params)
  ctx.body = createBody(re)
}
async function getPage(ctx) {
  const pageCode = ctx.params.code
  const re = await Dao.Page.findOne({pageCode})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
async function savePage(ctx) {
  const params = ctx.request.body
  await Dao.Page.save(params)
  ctx.body = createBody()
}
async function delPage(ctx) {
  await Dao.Page.delete(ctx.params.id)
  ctx.body = createBody()
}

export default (routes: any, prefix: string) => {
  routes.post(prefix + '/page/getOptions', getOptions)
  routes.post(prefix + '/page/searchPage', searchPage)
  routes.post(prefix + '/page/getPage/:code', getPage)
  routes.post(prefix + '/page/delPage/:id', delPage)
  routes.post(prefix + '/page/savePage', savePage)
  routes.post(prefix + '/page/getOptions', getOptions)
}
