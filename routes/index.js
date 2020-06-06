const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/session-test', async (ctx, next) => {
  if (ctx.session.viewCount === null) {
    ctx.session.viewCount = 0
  }

  ctx.session.viewCount++

  ctx.body = {
    error: 0,
    data: {
      viewCount: ctx.session.viewCount
    }
  }
})

module.exports = router
