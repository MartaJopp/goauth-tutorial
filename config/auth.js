// expose our config directly to our application using module.exports
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
    'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
            'callbackURL'   : 'http://localhost:8080/auth/google/callback'
}

}