const express = require('express');
const userControllers = require('../controllers/UserControllers');
const router = express.Router();

router.get('/', userControllers.loadCohorts, (req, res) => {
  console.log('got to this endpoint');
  return res.status(200).json(res.locals.cohortsLoad);
});

//find residents by cohort
router.post('/residents', userControllers.findUserByCohort, (req, res) => {
  return res.status(200).json(res.locals.usersFound);
});

module.exports = router;