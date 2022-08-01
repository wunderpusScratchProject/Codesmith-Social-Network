const express = require('express');
const userControllers = require('../controllers/UserControllers');
const router = express.Router();

router.get('/', userControllers.loadUsers, (req, res) => {
  console.log('got to this endpoint');
  return res.status(200).json(res.locals.usersLoad);
});

//Search resident by name
router.post('/', userControllers.findUserByName, (req, res) => {
  return res.status(200).json(res.locals.userFound);
});

module.exports = router;