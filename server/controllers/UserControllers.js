const db = require('../models/UserModel');
const { PG_URI } = require('../secrets');

const userControllers = {};

// Load list of all users when residents tab is clicked.
userControllers.loadUsers = async (req, res, next) => {
  const text = 'SELECT * FROM residents ORDER BY name';
  console.log('Got to load Users');
  try {
    const usersLoad = await db.query(text);
    res.locals.usersLoad = usersLoad.rows;
    return next();
  } catch (error) {
    return next({
      log: `userControllers.loadUsers error: ${error}`,
      message: 'Error found @ userControllers.loadUsers',
    });
  }
};

// Load list of all organizations when orgs tab is clicked.
userControllers.loadOrgs = async (req, res, next) => {
  const text =
    'SELECT DISTINCT organization FROM residents ORDER BY organization';
  try {
    const orgsLoad = await db.query(text);
    res.locals.orgsLoad = orgsLoad.rows;
    return next();
  } catch (error) {
    return next({
      log: `userControllers.loadOrgs error: ${error}`,
      message: 'Error found @ userControllers.loadOrgs',
    });
  }
};

// Load list of all cohorts when cohorts tab is clicked.
userControllers.loadCohorts = async (req, res, next) => {
  const text = 'SELECT DISTINCT cohort FROM residents ORDER BY cohort';
  try {
    const cohortsLoad = await db.query(text);
    res.locals.cohortsLoad = cohortsLoad.rows;
    return next();
  } catch (error) {
    return next({
      log: `userControllers.loadCohorts error: ${error}`,
      message: 'Erorr found @ userControllers.loadCohorts',
    });
  }
};

// Loads user profile when user is clicked throughout tabs.
userControllers.loadUserProfile = async (req, res, next) => {
  const { id } = req.params;
  const text = `SELECT * FROM residents WHERE id=${id}`;
  try {
    const profile = await db.query(text);
    res.locals.profile = profile.rows;
    return next();
  } catch (error) {
    return next({
      log: `userControllers.loadUserProfile error: ${error}`,
      message: 'Erorr found @ userControllers.loadUserProfile',
    });
  }
};

//Controller to find user.
//If req.query.query exists, we are trying to find a specific user
//Otherwise return all users in table
userControllers.findUserByName = async (req, res, next) => {
  const text = `SELECT * FROM residents 
    WHERE LOWER(name) LIKE LOWER('%${req.body.name}%') 
    or LOWER(cohort) LIKE LOWER('%${req.body.name}%')
    or LOWER(organization) LIKE LOWER('%${req.body.name}%')
    ORDER BY name`;
  try {
    const userFound = await db.query(text);
    res.locals.userFound = userFound.rows;
    return next();
  } catch (error) {
    return next({
      log: `userControllers.findUser error: ${error}`,
      message: 'Erorr found @ userControllers.findUser',
    });
  }
};

//Controller to find user by Id
userControllers.findUserById = async (req, res, next) => {
  console.log(req.body);
  const text = `SELECT * FROM residents WHERE id=${req.body.id}`;
  try {
    const userFound = await db.query(text);
    res.locals.userFound = userFound.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `userControllers.findUser error: ${error}`,
      message: 'Erorr found @ userControllers.findUser',
    });
  }
};

//Controller to find users that work at a specific organization

userControllers.findUserByOrganization = async (req, res, next) => {
  console.log(req.body);
  const text = `SELECT * FROM residents WHERE LOWER(organization)=LOWER('${req.body.organization}')`;

  try {
    const usersFound = await db.query(text);
    res.locals.usersFound = usersFound.rows;
    return next();
  } catch (error) {
    return next({
      log: `userControllers.findUserByOrganization error: ${error}`,
      message: 'Erorr found @ userControllers.findUserByOrganization',
    });
  }
};

//Controller to find users that work at a specific cohort

userControllers.findUserByCohort = async (req, res, next) => {
  console.log(req.body.cohort);
  const text = `SELECT * FROM residents WHERE LOWER(cohort)=LOWER('${req.body.cohort}')`;

  try {
    const usersFound = await db.query(text);
    res.locals.usersFound = usersFound.rows;
    return next();
  } catch (error) {
    return next({
      log: `userControllers.findUserByCohort error: ${error}`,
      message: 'Erorr found @ userControllers.findUserByCohort',
    });
  }
};

//Check to see if user already exists in Codesmith Social Network Database
userControllers.verifyUserExists = async (req, res, next) => {
  //obtain email from prev res.locals.email stored during previous middleware function
  const email = res.locals.email;
  const text = 'SELECT id FROM residents WHERE email = $1';

  try {
    const idFound = await db.query(text, [email]);
    //if email exists: create property on res.locals to skip create user middleware
    if (idFound.rows.length) {
      console.log('We found an id', idFound.rows[0]);
      res.locals.shouldSkipCreateUser = true;
      res.cookie('userId', idFound.rows[0].id);
    } else {
      console.log('No such user exists. Creating one');
      res.locals.shouldSkipCreateUser = false;
    }
    return next();
  } catch (error) {
    return next({
      log: `userControllers.verifyUserExists error: ${error}`,
      message: 'Erorr found @ userControllers.VerifyUserExists',
    });
  }
};

//create new User from either res.locals.newUser or req.body... Not sure from where yet.
//@value ( res.locals.userCreated ) New user created in table residents
userControllers.createUser = async (req, res, next) => {
  try {
    if (res.locals.shouldSkipCreateUser) return next();
    const { name, profilePic, email } = res.locals;
    const values = [name, profilePic, '', '', '', '', email];
    const text =
      'INSERT INTO residents (name, photo, cohort, organization, linkedin, message, email) VALUES($1, $2, $3, $4, $5, $6, $7)';
    await db.query(text, values);
    const userCreated = await db.query(
      'SELECT id FROM residents ORDER BY id DESC LIMIT 1'
    );
    console.log(userCreated.rows[0].id);

    res.cookie('userId', userCreated.rows[0].id);

    res.locals.userCreated = userCreated;
    return next();
  } catch (err) {
    return next({
      log: `userControllers.createUser error: ${err}`,
      message: 'Erorr found @ userControllers.createUser',
    });
  }
};

//update user requiring @value ( req.body.id )
//req.body must also have name, photo, cohort, organization and linkedin to be not undefined
//@value ( res.locals.updateUser ) return updated user
userControllers.updateUser = async (req, res, next) => {
  try {
    const { name, photo, cohort, organization, linkedin, email } =
      req.body.user;
    const values = [name, photo, cohort, organization, linkedin];
    const text = `UPDATE residents SET name='${name}', photo='${photo}', cohort='${cohort}', organization='${organization}', linkedin='${linkedin}', email='${email}' WHERE id='${req.body.id}'`;
    const updatedUser = await db.query(text);
    res.locals.updatedUser = updatedUser;
    return next();
  } catch (err) {
    return next({
      log: `userControllers.updateUser error: ${err}`,
      message: 'Erorr found @ userControllers.updateUser',
    });
  }
};
// Register new user
userControllers.registerUser = async (req, res, next) => {
  try {
    const { id, cohort, organization, linkedin } = req.body;
    const text = `UPDATE residents SET cohort='${cohort}', organization='${organization}', linkedin='${linkedin}' WHERE id='${id}'`;
    const registeredUser = await db.query(text);
    res.locals.registeredUser = registeredUser;
    return next();
  } catch (err) {
    return next({
      log: `userControllers.registerUser error: ${err}`,
      message: 'Erorr found @ userControllers.registerUser',
    });
  }
};

//delete user requiring @value ( req.body.id )
userControllers.deleteUser = async (req, res, next) => {
  const { name } = req.body;
  const options = [name];
  try {
    const text = 'DELETE FROM residents WHERE name=$1';
    const userDeleted = await db.query(text, options);
    res.locals.userDeleted = userDeleted;
    res.cookie('userId', null);

    return next();
  } catch (err) {
    return next({
      log: `userControllers.deleteUser error: ${err}`,
      message: 'Erorr found @ userControllers.deleteUser',
    });
  }
};

userControllers.test = async (req, res, next) => {
  console.log('testing middleware');
  console.log(req.body);
  return next();
};

module.exports = userControllers;
