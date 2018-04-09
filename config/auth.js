// exposes config directly to the application using module.exports
/* dotenv fetches credentials stored in .env file*/
require('dotenv').config();

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var GOOGLE_CALL_BACK = process.env.GOOGLE_CALL_BACK;

var FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
var FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
var FACEBOOK_CALL_BACK = process.env.FACEBOOK_CALL_BACK;

module.exports = {

    'facebookAuth': {
        'clientID': FACEBOOK_CLIENT_ID, // app ID
        'clientSecret': FACEBOOK_CLIENT_SECRET, // App Secret
        'callbackURL': FACEBOOK_CALL_BACK,
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

'googleAuth' : {
    'clientID'      : GOOGLE_CLIENT_ID,
        'clientSecret'  : GOOGLE_CLIENT_SECRET,
            'callbackURL'   : GOOGLE_CALL_BACK
}

}