const { Router } = require('express');
const { exchangeCode, callMeAPI, callEmailAPI, callProfilePicAPI, setAuthCodeCookie } = require('../controllers/oauthController');
const { createUser, verifyUserExists } = require('../controllers/UserControllers');
// TODO: (Nick) no idea if the below line is necessary. Test?
// TODO: I don't know how to get to the homepage without React Router
const { route } = require('../server');

const router = Router();

router.get('/', 
  exchangeCode, 
  callMeAPI,
  callEmailAPI,
  callProfilePicAPI, 
  verifyUserExists,
  createUser,
  (req, res) => {
    return res.redirect('http://localhost:8080/');
  });

module.exports = router;