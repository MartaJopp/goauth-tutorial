// expose our config directly to our application using module.exports
/* dotenv fetches credentials stored in .env file*/
require('dotenv').config();

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var GOOGLE_CALL_BACK = process.env.GOOGLE_CALL_BACK;

module.exports = {

    'facebookAuth': {
        'clientID': '158826404763545', // your App ID
        'clientSecret': '963df0d8446b5cb2aa24f8e8e34c650d', // your App Secret
        'callbackURL': 'http://localhost:5000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

'googleAuth' : {
    'clientID'      : GOOGLE_CLIENT_ID,
        'clientSecret'  : GOOGLE_CLIENT_SECRET,
            'callbackURL'   : 'http://localhost:5000/auth/google/callback'
}

}