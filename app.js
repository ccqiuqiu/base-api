const Koa = require('koa')
const app = new Koa()
const favicon = require('koa-favicon')
const responseTime = require('koa-response-time')
const log4js = require('koa-log4')
const compress = require('koa-compress')
const cors = require('kcors')
const serve = require('koa-static')
const mount = require('koa-mount')
const services = require('./services')
const db = require('./data/db')
const session = require("koa-session2")
const redisStore = require('./services/redisStore')

// 初始化日志配置
log4js.configure({
  appenders: [
    {type: 'console'},
    {type: 'dateFile', filename: 'logs/app.log', pattern: "-yyyy-MM-dd", alwaysIncludePattern: false, category: 'app', usefsync: true},
    {type: 'dateFile', filename: 'logs/db.log', pattern: "-yyyy-MM-dd", alwaysIncludePattern: false, category: 'db', usefsync: true}
  ]
})
const logger = log4js.getLogger('app')
// 使用一些中间件
app.use(favicon(__dirname + '/favicon.ico')) // favicon中间件
app.use(responseTime()) // 响应时间中间件 会设置X-Response-Time
app.use(log4js.koaLogger(logger, {level: 'auto'})) // 日志中间件
app.use(compress()) // 数据压缩中间件
app.use(cors({credentials: true})) // 跨域中间件
app.use(session({ maxAge: 20 * 60 * 1000, store: new redisStore()}))// koa-session2中间件
app.use(serve('static', {maxage: 2 * 60 * 1000}))// 设置静态文件中间件

// 验证登录
app.use(async (ctx, next) => {
  //跳过不需要验证的页面
  if (ctx.request.url.indexOf('/v1/public/') === 0) {
    return await next()
  }
  // session里面有用户信息，说明已经登录
  if (ctx.session.user) {
    await next() 
  } else {
    ctx.body = {
      success: false,
      code: 401,
      message: '身份认证失败'
    }
  }
});
// 路由
app.use(mount('/v1', services.v1))

// 全局异常
app.on('error', function (err, ctx) {
  logger.error('服务器异常', err)
})

// 初始化数据库
async function initDB() {
  console.log('正在连接数据库...')
  return await db.sequelize.client.sync(/*{force: true}*/)
}

// 数据库初始化成功后启动服务
initDB().then((conn) => {
  app.listen(3000)
  console.log('启动成功')
}).catch(err => {
  console.log('数据库连接失败', err)
})
