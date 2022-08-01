const { Router } = require('express');
const { route } = require('../server');
const { exchangeCode } = require('../controllers/oauthController');

const router = Router();

router.get('/', 
  (req, res, next) => {
    console.log(req.cookies);
    return next()
  },
  exchangeCode, 
  (req, res) => {
    res.status(200).send(true);
  }
);

module.exports = router;