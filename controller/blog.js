const { exec } = require('../db/mysql')

/**
 * 获取博客列表
 * 
 * @param {string} author 
 * @param {string} keyword 
 */
const getList = async (author, keyword) => {
  
  let sql = `select * from bolgs where 1=1 `

  if (author) {
    sql += `and author='${author}'`
  }

  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }

  sql += `order by createtime desc;`

  return await exec(sql);
}


/**
 * 获取博客详情
 * 
 * @param {number} id 
 */
const getDetail = async (id) => {
  const sql = `select * from bolgs where id='${id}'`
  const rows = await exec(sql);
  return rows[0]
}


/**
 * 创建博客
 * 
 * 
 * @param {*} blogData 
 */
const newBlog = async (blogData = {}) => {

  const {title, content, author} = blogData;
  const createtime = Date.now()
  
  
  const sql = `
    insert into bolgs (title,content,createtime,author) 
    values (?,?,?,?);
  `
  const params = [title, content, createtime, author]
  const insertData = await exec(sql, params);

  return {
    id: insertData.insertId,
  }

  
}


/**
 * 
 * 更新博客
 * 
 * @param {*} blogData 
 */
const updateBlog = async (id, blogData = {}) => {
  
  const { title, content } = blogData;

  const sql = `update bolgs set title='${title}', content='${content}' where id='${id}'`
  const updateData = await exec(sql);

  if (updateData.affectedRows > 0) {
    return true
  }

  return false
  
}



/**
 * 删除博客
 * 
 * 
 * @param {*} id 
 * @param {*} author 
 */
const delBLog = async (id, author) => {
  const sql = `delete from bolgs where id='${id}' and author='${author}'`
  const delData = await exec(sql);

  if (delData.affectedRows > 0) {
    return true
  }
  return false

  
}




module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBLog,
}
