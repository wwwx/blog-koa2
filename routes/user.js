const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/res.model')
const { login } = require('../controller/user');

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const data = await login(username, password);


  if (data.username) {
    ctx.session.username = data.username
    ctx.session.realname = data.realname

    // console.log('login: ', req.session)

    ctx.body = new SuccessModel();

    return
  }

  ctx.body = new ErrorModel('Login failed');

})


router.post('/logout', async (ctx, next) => {

  ctx.session = null;
  ctx.body = new SuccessModel('OK');
})


module.exports = router
