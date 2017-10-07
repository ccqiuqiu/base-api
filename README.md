这是一个基于koa2的后台api项目，可以提供RESTful API给各种项目使用，通过sequelize无缝支持postgreSql、mysql、sqlite、MSSQL，本项目默认使用mysql。

启动此项目需要修改data/db/sequelize/index.js里面数据库配置，默认连接的是本地mysql，数据库名为baseApi

# 主要技术栈
- koa2
- sequelize
- redis

# 需要环境
- node.js > 8
- redis

# 命令
```
npm run dev    #开发
```

#目录结构和说明

```
├─ data                                # 数据相关
│   ├─ dataProvider                    # 数据提供者 类似ORM框架中的dao层
│   │   ├── *.js                       # 一些数据提供者 
│   │   └── index.js                   # 导出各个数据提供者
│   ├─ db                              # 数据库相关
│   │   ├── sequelize                  # 数据库配置目录
│   │   │    ├── mopdels               # model目录，对应数据库的表
│   │   │    └─- index.js              # 数据库配置文件
│   │   └── index.js                   # 导出数据库对象
├─ logs                               # 日志文件保存目录
├─ services                           # 接口层
│   ├─ v1                             # v1版本的接口
│   │   ├── *.js                      # 路由配置
│   │   ├── creatBody.js              # 统一处理返回的body
│   │   └── index.js                  # 导出所有的路由配置
│   ├─ config.js                      # 项目的一些参数设置
│   ├─ index.js                       # 导出v1的所有接口
│   └─ redisStore.js                  # 用redis作为session的存储
└─ app.js                             # 入口文件
```

## 功能说明
- 多种数据库支持（postgreSql、mysql、sqlite、MSSQL）
- 完善的日志管理和异常处理
- 通过如redis实现session功能和权限管理
- 全部es6语法，通过koa2使用async函数，代码更整洁
- 有些看起来意义好像不大的代码都是为后期扩展做准备

# 其他项目
- [base-react](https://github.com/ccqiuqiu/base-react) 一个react项目框架 
- [base-vue](https://github.com/ccqiuqiu/base-vue) 一个vue项目框架 
- [base-api](https://github.com/ccqiuqiu/base-api) 一个基于koa2的后台api项目
- [F.List](https://github.com/ccqiuqiu/F.List) 一个包含待办、备忘、密码本功能的android项目
- [F.Money](https://github.com/ccqiuqiu/F.Money) 一个包含流水、借贷、图表统计的多账户、多用户记账的android项目
- [F.Time](https://github.com/ccqiuqiu/F.Time) 一个包含闹钟、提醒、进度条的android项目

# 计划
- 一个基于react + mbox的项目框架
- 一个基于koa + mongodb的后台API项目
- 一个基于react + rxjs + redux-observable 的项目框架
- 一个angular项目框架
