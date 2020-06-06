const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/res.model')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBLog,
} = require('../controller/blog')
const checkLogin = require('../midware/check-login');

router.prefix('/api/blog');


router.get('/list',  async (ctx, next) => {
  let author = ctx.query.author || ''
  let keyword = ctx.query.keyword || ''

  if (ctx.query.isAdmin) {

    if (ctx.session.username === null) {
      ctx.body = new ErrorModel('Not logged in');

      return
    }

    author = ctx.session.username
  }

  const listData = await getList(author, keyword);
  ctx.body = new SuccessModel(listData);
  
})


router.get('/detail', async (ctx, next) => {
  const detailData = await getDetail(ctx.query.id);
  ctx.body = new SuccessModel(detailData);
  
})


router.post('/new', checkLogin, async (ctx, next) => {
  const body = ctx.request.body;
  body.author = ctx.session.username

  const data = await newBlog(body);
  ctx.body = new SuccessModel(data);
  
})


router.post('/edit', checkLogin, async (ctx, next) => {
  const body = ctx.request.body;
  const id = ctx.query.id;
  const data = await updateBlog(id, body)

  // console.log('updateBlog ----------- ', data)
  
  if (data) {
    ctx.body = new SuccessModel()
    return ;
  }

  ctx.body = new ErrorModel('Edit error')

})


router.post('/del', checkLogin, async (ctx, next) => {
  const author = ctx.session.username;
  const id = ctx.query.id;
  const data = await delBLog(id, author)

  if (data) {
    ctx.body = new SuccessModel();
    return ;
  }

  ctx.body = new ErrorModel('Delete error')

})



module.exports = router
