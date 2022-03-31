const express = require('express');
const router = express.Router();
const getLogin = require('../services/getLogin.js');

/* GET programming languages. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await getLogin.getLogin(req.body.email, req.body.pwd));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get('/check', async function(req, res, next) {
  try {
    res.json(await getLogin.checkLogin(req.headers['authorization']));
  } catch (err) {
    console.error(`Error while getting`, err.message);
    next(err);
  }
})

module.exports = router;