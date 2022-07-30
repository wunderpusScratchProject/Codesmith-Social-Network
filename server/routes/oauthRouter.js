const { Router } = require('express');
const oauthController = require('../controllers/oauthController');
// TODO: (Nick) no idea if the below line is necessary. Test?
const { route } = require('../server');

const router = Router();

router.get('/', oauthController.auth, (req, res) => {
  return res.status(200).json(res.locals.res);
})

module.exports = router;