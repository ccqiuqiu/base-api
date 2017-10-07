/**
 * Created by cc on 2017/8/2.
 */
module.exports = function(sequelize, DataTypes) {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.CHAR
  })
  return Todo
}