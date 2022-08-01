const CLIENT_SECRET = require('../secrets.js');

const CLIENT_ID = '78jexcndblghpj';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A8080%2';

const oauthController = {};
// TODO: Refactor this route to use our NODE_ENV to point to localhost:3000 if production and 8080 if dev. Then switch localhost:3000 again once we get the site hosted.
// TODO: Make actual error handling
// TODO (stretch feature, to prevent CSRF attacks, which don't matter on our site, since a malicious actor can't do anything except mess with the user profile a bit): Generate unique state and store it in use cookies. https://auth0.com/docs/secure/attack-protection/state-parameters
oauthController.exchangeCode = async (req, res, next) => {
  try {
    const authCode = req.query.code;
    console.log(authCode);
    console.log(CLIENT_SECRET);
    // console log to make sure the URL is properly formed:
    console.log(`https://www.linkedin.com/oauth/v2/accessToken/?grant_type=authorization_code&code=${authCode}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const accessToken = await fetch(
      `https://www.linkedin.com/oauth/v2/accessToken/?grant_type=authorization_code&code=${authCode}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, 
      {method: 'POST'});
    console.log(accessToken);
    res.locals.accessToken = accessToken.access_token;
    return next();
  }
  catch(err) {
    console.log(err);
    return next(err);
  }
};

oauthController.callMeAPI = async (req, res, next) => {
  try {
    const result = await fetch(
      'https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: 'Bearer' + res.locals.accessToken
        }
      }
    );
    res.locals.name = result.localizedFirstName + ' ' + result.localizedLastName;
    console.log('me API call result');
    console.log(result);
    return next();
  }
  catch(err) {
    return next(err);
  }
};

oauthController.callEmailAPI = async (req, res, next) => {
  try {
    const result = await fetch(
      'GET https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: {
          Authorization: 'Bearer' + res.locals.accessToken
        }
      }
    );
    console.log('email API call result');
    console.log(result);
    res.locals.email = result.elements[0]['handle~'].emailAddress;
    return next();
  }
  catch(err) {
    return next(err);
  }
};

// handle getting basic profile info
// GET https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))

module.exports = oauthController;