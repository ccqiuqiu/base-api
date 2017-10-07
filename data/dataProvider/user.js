/**
 * Created by cc on 2017/8/2.
 */
const db = require('../db/index')

exports.getUser = async user => {
  return await db.sequelize.User.findOne({
    where: {userName: user.userName, passWord: user.passWord}
  })
}