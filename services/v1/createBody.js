// 封装通用的响应数据
module.exports = function (data, success = true, message = '') {
  return {
    success: success,
    data: data,
    message: message
  }
}