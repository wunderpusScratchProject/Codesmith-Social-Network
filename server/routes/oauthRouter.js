const { Router } = require('express');
const { exchangeCode, callMeAPI, callEmailAPI, setAuthCodeCookie } = require('../controllers/oauthController');
const { createUser } = require('../controllers/UserControllers');
// TODO: (Nick) no idea if the below line is necessary. Test?
// TODO: I don't know how to get to the homepage without React Router
const { route } = require('../server');

const router = Router();

router.get('/', 
  exchangeCode, 
  callMeAPI,
  callEmailAPI, 
  /* create user middleware */ 
  createUser,
  // setAuthCodeCookie,
  (req, res) => {
    return res.redirect('http://localhost:8080/');
  });

module.exports = router;