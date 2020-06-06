const { exec, escape } = require('../db/mysql')
const { generatePassword } = require('../utils/crypto')


/**
 * 
 * 用户登录
 * 
 * @param {*} username 
 * @param {*} password 
 */
const login = async (username, password) => {

  password = generatePassword(password)
  
  username = escape(username)
  password = escape(password)

  const sql = `select username, realname from users where username=${username} and password=${password}`
  const rows = await exec(sql);

  return rows[0] || {}
}

module.exports = {
  login,
}
