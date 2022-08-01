const db = require('../models/UserModel');

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
    return next({ log: `userControllers.loadUsers error: ${error}`, message: 'Erorr found @ userControllers.loadUsers' });
  }
};

// Load list of all organizations when orgs tab is clicked.
userControllers.loadOrgs = async (req, res, next) => {
  const text = 'SELECT DISTINCT organization FROM residents ORDER BY organization';
  try {
    const orgsLoad = await db.query(text);
    res.locals.orgsLoad = orgsLoad.rows;
    return next();
  } catch (error) {
    return next({ log: `userControllers.loadOrgs error: ${error}`, message: 'Erorr found @ userControllers.loadOrgs' });
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
    return next({ log: `userControllers.loadCohorts error: ${error}`, message: 'Erorr found @ userControllers.loadCohorts' });
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
    return next({ log: `userControllers.loadUserProfile error: ${error}`, message: 'Erorr found @ userControllers.loadUserProfile' });
  }
};



//Controller to find user.
//If req.query.query exists, we are trying to find a specific user
//Otherwise return all users in table
userControllers.findUserByName = async (req, res, next) => {
  const text = `SELECT * FROM residents WHERE LOWER(name) LIKE LOWER('${req.body.name}%') ORDER BY name`;
  try {
    const userFound = await db.query(text);
    res.locals.userFound = userFound.rows;
    return next();
  } catch (error) {
    return next({ log: `userControllers.findUser error: ${error}`, message: 'Erorr found @ userControllers.findUser' });
  }
};

//Controller to find user by Id
userControllers.findUserById = async (req, res, next) => {
  const text = `SELECT * FROM residents WHERE id=${req.body.id}`;
  try {
    const userFound = await db.query(text);
    res.locals.userFound = userFound.rows[0];
    return next();
  } catch (error) {
    return next({ log: `userControllers.findUser error: ${error}`, message: 'Erorr found @ userControllers.findUser' });
  }
};

//Controller to find users that work at a specific organization

userControllers.findUserByOrganization = async (req, res, next) => {
  console.log(req.body)
  const text = `SELECT * FROM residents WHERE LOWER(organization)=LOWER('${req.body.organization}')`;
  
  try {
    const usersFound = await db.query(text);
    res.locals.usersFound = usersFound.rows;
    return next();
  } catch (error) {
    return next({ log: `userControllers.findUserByOrganization error: ${error}`, message: 'Erorr found @ userControllers.findUserByOrganization' });
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
    return next({ log: `userControllers.findUserByCohort error: ${error}`, message: 'Erorr found @ userControllers.findUserByCohort' });
  }
};

//create new User from either res.locals.newUser or req.body... Not sure from where yet.
//@value ( res.locals.userCreated ) New user created in table residents
userControllers.createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
    } = res.locals;
    const values = [name, '', '', '', '', '', email];
    const text = 'INSERT INTO residents (name, photo, cohort, organization, linkedin, message, email) VALUES($1, $2, $3, $4, $5, $6, $7)';
    await db.query(text, values);
    const userCreated = await db.query('SELECT id FROM residents ORDER BY id DESC LIMIT 1');
    console.log(userCreated.rows[0].id);

    res.cookie('userId', userCreated.rows[0].id);
    
    res.locals.userCreated = userCreated;
    return next();
  } catch (err) {
    return next({ log: `userControllers.createUser error: ${err}`, message: 'Erorr found @ userControllers.createUser' });
  }
};

//update user requiring @value ( req.body.id )
//req.body must also have name, photo, cohort, organization and linkedin to be not undefined
//@value ( res.locals.updateUser ) return updated user
userControllers.updateUser = async (req, res, next) => {
  try {
    const {
      name,
      photo,
      cohort,
      organization,
      linkedin
    } = res.locals.newUser;
    const values = [name, photo, cohort, organization, linkedin];
    const text = `UPDATE residents SET name=${name}, photo=${photo}, cohort=${cohort}, organization=${organization}, linkedin=${linkedin} WHERE id=${req.body.id}`;
    const updatedUser = await db.query(text, values);
    res.locals.updatedUser = updatedUser;
    return next();
  } catch (err) {
    return next({ log: `userControllers.createUser error: ${err}`, message: 'Erorr found @ userControllers.createUser' });
  }
};

//delete user requiring @value ( req.body.id )
userControllers.deleteUser = async (req, res, next) => {
  try {
    const text = `DELETE FROM residents WHERE id=${req.body.id}`;
    const userDeleted = await db.query(text);
    res.locals.userDeleted = userDeleted;
    
    return next();
  } catch (err) {
    return next({ log: `userControllers.deleteUser error: ${err}`, message: 'Erorr found @ userControllers.deleteUser' })
  }
};

module.exports = userControllers;