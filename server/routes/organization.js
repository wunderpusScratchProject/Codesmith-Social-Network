const express = require('express');
const userControllers = require('../controllers/UserControllers');
const router = express.Router();

router.get('/', userControllers.loadOrgs, (req, res) => {
  console.log('got to this endpoint');
  return res.status(200).json(res.locals.orgsLoad);
});

//find residents by organizaiton 
router.post('/residents', userControllers.findUserByOrganization, (req, res) => {
  return res.status(200).json(res.locals.usersFound);
});

module.exports = router;