const db = require('./db');
const helper = require('../helper');
const config = require('../config');
var sha512 = require('js-sha512');
var jwt = require('jsonwebtoken');
var moment = require('moment');

async function getLogin(email, pass){
  const enPass = sha512(pass)
  // const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM login WHERE email = '${email}' && pwd = '${enPass}'`
  );
  var token;
  if (rows) {
    token = { bearer: jwt.sign({ data: rows, expired: moment().add(90, 'D').format('YYYY-MM-DD') }, 'ipanB', { expiresIn: 7889400 })}
  }
  const data = helper.emptyOrRows(token);
  // const meta = {page};

  return {
    data
  }
}
async function checkLogin(token){
  console.log(token)
  const data = jwt.verify(token, 'ipanB')
  console.log(data)

  return {
    data
  }
}

module.exports = {
  getLogin,
  checkLogin
}