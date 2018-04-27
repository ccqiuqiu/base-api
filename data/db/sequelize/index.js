/**
 * Created by cc on 2017/8/2.
 */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize')
const log4js = require('koa-log4')

const logger = log4js.getLogger('db')

const client = new Sequelize('baseApi', 'root', 'cc', {
  host: '127.0.0.1',
  dialect: 'mysql', // 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging (log){
    logger.info(log)
  }
});
const models = {};

// 自动读取model并建表
fs.readdirSync(__dirname + '/models')
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    const model = client.import(path.join(__dirname + '/models', file));
    models[model.name] = model;
  });

Object.keys(models).forEach(function (modelName) {
  if (models[modelName].options.hasOwnProperty('associate')) {
    models[modelName].options.associate(models);
  }
});
module.exports = models;
module.exports.client = client;