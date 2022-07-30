const CLIENT_ID = '78jexcndblghpj';
const REDIRECT_URI = 'https%3A%2F%2Flocalhost%3A8080%2Fhome';
const SCOPE = 'r_liteprofile';

const oauthController = {};
// TODO: Refactor this route to use our NODE_ENV to point to localhost:3000 if production and 8080 if dev. Then switch localhost:3000 again once we get the site hosted.
// TODO: Make actual error handling
// TODO (stretch feature, to prevent CSRF attacks, which don't matter on our site, since a malicious actor can't do anything except mess with the user profile a bit): Generate unique state and store it in use cookies. https://auth0.com/docs/secure/attack-protection/state-parameters
oauthController.auth = async (req, res, next) => {
  try {
    const res = await fetch(`https://www.linkedin.com/oauth/v2/authorization/
      ?response_type="code"
      &client_id=${CLIENT_ID}
      &redirect_uri=${REDIRECT_URI}
      &state="A9Sd.udf8-d1"
      &scope=${SCOPE}`);
    console.log(res);
    req.locals.res = res;
    return next();
  }
  catch(err) {
    console.log(err);
    return next(err);
  }
};

// handle getting basic profile info
// GET https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))

module.exports = oauthController;