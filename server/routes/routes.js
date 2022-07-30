const express = require('express');

const controller = require('../controllers/controllers');
const app = require('../server');

const router = express.Router();

/* __________Login__________*/

//Post request to redirect to home page on successful authentiction


/* __________Landing__________*/

//Post request to LinkedIn API?



/* __________Home__________*/

//Get request to DB to render user info (front-end)

//Patch request from user profile updates (front-end?)

//Patch request to set new cohort (front-end?)

//Get request to query DB by user name
router.get('/home', userControllers.findUser, (req, res) => {
    res.status(200).json(res.locals.updateFound);
});

//Get request to query db by company name
router.post('/home', userControllers.findUser, (req, res) => {
    res.get(200).json(res.locals.updateFound);
});






module.exports = router;

/*
// Residents table in database
// residents (
//       id serial PRIMARY KEY,
//       name varchar( 100 )  NOT NULL,
//    photo varchar( 150 ),
//       cohort varchar( 150 ) NOT NULL,
//    organization varchar( 150 ),
//    linkedin varchar( 150 ) NOT NULL
// );

userControllers.'func'

findUser() res.locals.updateFound
createUser() res.locals.userCreated
updateUser() res.locals.updateUser
deleteUser() res.locals.userDeleted
*/