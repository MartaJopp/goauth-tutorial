//everything needed
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// load user model
var User = require('../app/models/user');

//load auth variables
var configAuth = require('./auth');


// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // serializes user session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // deserializes user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {

            process.nextTick(function () {

                //check if that email exists
                User.findOne({ 'local.email': email }, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if exists send message
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        //no username found - creates user
                        var newUser = new User();

                        // set password and email
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save 
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // entire requests passes back
    },
        function (req, email, password, done) {

            // check to see if user exists and login
            User.findOne({ 'local.email': email }, function (err, user) {
                // error
                if (err)
                    return done(err);

                //error if no username found
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                //wrong password
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                //logins
                return done(null, user);
            });

        }));

    passport.use(new FacebookStrategy({

        // variables from auth.js
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL

    },

        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {

            process.nextTick(function () {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,

    },
        function (token, refreshToken, profile, done) {

            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function () {

                // try to find the user based on their google id
                User.findOne({ 'google.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser = new User();

                        // set all of the relevant information
                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));

};