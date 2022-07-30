const db = require('../Models/UserModel');

const userControllers = {};

//Controller to find user.
//If req.body.name exists, we are trying to find a specific user
//Otherwise return all users in table

userControllers.findUser = async (req, res, next) => {
  let text;
  //residents WHERE cohort=FTRI9 || WHERE Company=Microsoft
  //if req.body.method = 'searchName' => WHERE name = ${req.body.name}
  //if req.body.method = 'searchCohort' => WHERE name = ${req.body.cohort}
  // Maybe make one method that can search for all types. cohort, company, name. 
  req.body.name ? text = `SELECT * FROM residents WHERE name=${req.body.name}` : text = 'SELECT * FROM residents'
  try {
    const userFound = await db.query(text);
    res.locals.userFound = userFound;
    return next();
  } catch (error) {
    return next({ log: `userControllers.findUser error: ${error}`, message: 'Erorr found @ userControllers.findUser' });
  }
};

//create new User from either res.locals.newUser or req.body... Not sure from where yet.
//@value ( res.locals.userCreated ) New user created in table residents
userControllers.createUser = async (req, res, next) => {
  try {
    const {
      name,
      photo,
      cohort,
      organization,
      linkedin
    } = res.locals.newUser;
    const values = [name, photo, cohort, organization, linkedin];
    const text = 'INSERT INTO residents (name, photo, cohort, organization, linkedin) VALUES($1, $2, $3, $4, $5)';
    const userCreated = await db.query(text, values);
    
    res.locals.userCreated = userCreated
    return next();
  } catch (err) {
    return next({ log: `userControllers.createUser error: ${error}`, message: 'Erorr found @ userControllers.createUser' });
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
    return next({ log: `userControllers.createUser error: ${error}`, message: 'Erorr found @ userControllers.createUser' });
  }
};

//delete user requiring @value ( req.body.id )
userControllers.deleteUser = async (req, res, next) => {
  try {
    let text = `DELETE FROM residents WHERE id=${req.body.id}`;
    const userDeleted = await db.query(text);
    res.locals.userDeleted = userDeleted;
    
    return next();
  } catch (err) {
    return next({ log: `userControllers.deleteUser error: ${error}`, message: 'Erorr found @ userControllers.deleteUser' })
  }
};

module.exports = userControllers;





//import x from y
//const x require(y)

//module.exports = y
//export default y