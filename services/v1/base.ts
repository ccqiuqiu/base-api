/**
 * Created by 熊超超 on 2018/7/17.
 */
import createBody from './createBody'
import * as Dao from '../../data/dao/index'
import {mock} from 'mockjs'

async function getUserDashboard(ctx) {
  const re = await Dao.User.getUserDashboard(ctx.session.user.id)
  ctx.body = createBody(re)
}
async function getAllDashboard(ctx) {
  const re = await Dao.Dashboard.findPaged({pageSize: 0})
  ctx.body = createBody(re)
}
async function saveUserDashboard(ctx) {
  const re = await Dao.User.saveUserDashboard(ctx.session.user.id, ctx.request.body.userDashboards)
  ctx.body = createBody(re)
}
async function newOrder(ctx) {
  ctx.body = createBody({title: '150', link: '/baseData/page/user'})
}
async function userNum(ctx) {
  ctx.body = createBody({title: '18', link: '/baseData/page/user'})
}
async function messageNum(ctx) {
  ctx.body = createBody({title: '14', link: '/baseData/page/user'})
}
async function workNum(ctx) {
  ctx.body = createBody({title: '40%', link: '/baseData/page/user'})
}
async function todoList(ctx) {
  ctx.body = createBody(mock({
    'rows|5': [{
      title: '@ctitle(5, 10)',
      subTitle: '@ctitle(20, 30)',
      url: '/baseData/page/user'
    }],
    link: '/baseData/page/user'
  }))
}
async function messageList(ctx) {

  const re: any = await Dao.Dashboard.findPaged(ctx.request.body)
  re.columns = [
    {prop: 'name', label: '名称'},
    {prop: 'color', label: '颜色'},
    {prop: 'icon', label: '图标'},
  ],
  ctx.body = createBody(re)
}
async function chartDemo(ctx) {
  ctx.body = createBody({
    data: {
      columns: ['页面', '访问量'],
      rows: [
        { '页面': '首页', '访问量': 100000 },
        { '页面': '列表页a', '访问量': 20000 },
        { '页面': '列表页b', '访问量': 80000 },
        { '页面': '内容页a-1', '访问量': 10000 },
        { '页面': '内容页a-2', '访问量': 10000 },
        { '页面': '内容页b-1', '访问量': 60000 },
        { '页面': '内容页b-2', '访问量': 20000 }
      ]
    },
    settings: {}
  })
}

export default (routes: any, prefix: string) => {
  routes.post(prefix + '/base/getUserDashboard', getUserDashboard)
  routes.post(prefix + '/base/getAllDashboard', getAllDashboard)
  routes.post(prefix + '/base/saveUserDashboard', saveUserDashboard)
  routes.post(prefix + '/base/newOrder', newOrder)
  routes.post(prefix + '/base/userNum', userNum)
  routes.post(prefix + '/base/messageNum', messageNum)
  routes.post(prefix + '/base/workNum', workNum)
  routes.post(prefix + '/base/todoList', todoList)
  routes.post(prefix + '/base/messageList', messageList)
  routes.post(prefix + '/base/chartDemo', chartDemo)
}
