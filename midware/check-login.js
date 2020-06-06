const { ErrorModel } = require('../model/res.model')

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next()
    return
  }

  ctx.body = new ErrorModel('Not logged in');
}
