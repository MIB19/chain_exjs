const express = require('express');
const router = express.Router();
const getLogin = require('../services/getLogin.js');

/* GET programming languages. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await getLogin.getLogin(req.body.email, req.body.pass));
  } catch (err) {
    next(err);
  }
});
router.get('/check', async function(req, res, next) {
  try {
    res.json(await getLogin.checkLogin(req.headers['authorization']));
  } catch (err) {
    next(err);
  }
})
router.post('/signup', async function(req, res, next) {
  console.log('masuk')
  try {
    res.json(await getLogin.signUp(req.body.email, req.body.pass, req.body.nohp));
  } catch (err) {
    next(err);
  }
})

module.exports = router;