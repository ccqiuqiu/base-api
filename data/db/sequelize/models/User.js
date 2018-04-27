/**
 * Created by cc on 2017/8/2.
 */
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  })
  return User
}