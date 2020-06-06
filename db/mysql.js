const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

const con = mysql.createConnection(MYSQL_CONFIG)

con.connect()

const exec = (sql, params) => {
  const promise = new Promise((resolve, reject) => {
    if (params) {
      con.query(sql, params, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    } else {

      con.query(sql, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    }
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape,
}
