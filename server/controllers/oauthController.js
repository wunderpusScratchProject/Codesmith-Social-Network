const { CLIENT_SECRET } = require('../secrets.js');
const db = require('../models/UserModel');

const fetch = require('node-fetch');
const { createProxy } = require('http-proxy');
const CLIENT_ID = '78jexcndblghpj';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A8080%2Flogin';

const oauthController = {};
// TODO: Refactor this route to use our NODE_ENV to point to localhost:3000 if production and 8080 if dev. Then switch localhost:3000 again once we get the site hosted.
// TODO: Make actual error handling
// TODO (stretch feature, to prevent CSRF attacks, which don't matter on our site, since a malicious actor can't do anything except mess with the user profile a bit): Generate unique state and store it in use cookies. https://auth0.com/docs/secure/attack-protection/state-parameters

// response from linkedin authorization code sent to req.query.code
// within this middleware function, the server sends back the authorization code and client secret 
// TODO: save access token within res.cookie instead of authCode
oauthController.exchangeCode = async (req, res, next) => {
  try {
    const authCode = req.query.code || req.cookies.linkedInAuthCode;
    const accessToken = await fetch(
      `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${authCode}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
    const response = await accessToken.json();
    console.log('Response: ', response);
    res.locals.accessToken = response.access_token;
    res.cookie('linkedInAuthCode', authCode);
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
          Authorization: 'Bearer ' + res.locals.accessToken
        }
      }
    );
    const parsedResult = await result.json();
    res.locals.name = parsedResult.localizedFirstName + ' ' + parsedResult.localizedLastName;
    // console.log('me API call result');
    // console.log(parsedResult);
    return next();
  }
  catch(err) {
    return next(err);
  }
};

oauthController.callEmailAPI = async (req, res, next) => {
  try {
    console.log('callEmailAPI')
    const result = await fetch(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: {
          Authorization: 'Bearer ' + res.locals.accessToken
        }
      }
    );
    const parsedResult = await result.json();
    // console.log('email API call result');
    // console.log(parsedResult.elements[0]['handle~']);
    res.locals.email = parsedResult.elements[0]['handle~'].emailAddress;
    return next();
  }
  catch(err) {
    return next(err);
  }
};

oauthController.userComplete = async (req, res, next) => {
  const text = `SELECT cohort FROM residents WHERE id=${req.cookies.userId} AND cohort=''`;
  try {
    let complete = await db.query(text);

    // console.log('Complete rows ',complete.rows);
    if (complete.rows.length === 0) complete = true;
    else complete = false;
    res.locals.complete = complete;
    return next();
  } catch (err) {
    return next({log: 'Error caight in userComplete' });
  }
};
// handle getting basic profile info
// GET https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))

//res.locals.accessToken
oauthController.callProfilePicAPI = async (req, res, next) => {
  try {
    const result = await fetch(
      'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
        headers: {
          Authorization: 'Bearer ' + res.locals.accessToken
        }
      }
    );
    const parsedResult = await result.json();
    res.locals.profilePic = parsedResult.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
    return next();
  } catch (err) {
    return next(err);
  }
}

console.log(len('alphabetagammadelta'))

module.exports = oauthController;

'AQTLzsQiF7FSapPDta6Clk7G6hMcE7qNzdWmsbCTCrVevGiGyCJer1eAEBc26kXriCPTSXRy5mXLWIbIB7EJi30b9HZPLWx2keoI2IoRNUPWbtT1kh7fpiha1m_N4xdxIhA1B5dMUlI7Y8HQd6fEWGpau6LABrqLTakmBZFL8M1nm5GoBmozA08jIMt7iAZhy33u85rWrMbfui2Ehng'
'AQSwWynk77TSD7-hXhaWbUymspIOa8p7umlMDAzabhPmCK3eR-qSaKB11OmoFzPCXkRHjWcaKI_dfEbpZMuZoQk8WNwz1aXd-fkRDk0W6EWx_xBFPoBG4vF92mawjfonQ4DdIAOYS_kGpgCzYPjRlXQXEqBKBFj2NHBWYsPaGzpVVu02pMywRXmwSpN3JTOTKWONWfdnoPyowCSKzto'