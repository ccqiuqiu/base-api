/**
 * Created by cc on 2017/8/2.
 */
const db = require('../db/index')

exports.findAll = async () => {
  return await db.sequelize.Todo.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
}