const bcrypt = require('bcrypt');



const saltRounds = 10;
const userID = '20';

bcrypt.hash(userID, saltRounds, (err, hash) => {
  console.log('this is the hash: ', hash);
});
