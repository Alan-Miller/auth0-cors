require ('dotenv').config();
const { 
    PORT, SECRET, CONNECTION_STRING, 
    AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_CALLBACK_URL 
} = process.env;

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const massive = require('massive');
const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then(db => app.set('db', db));

passport.use(new Auth0Strategy(
    {
        domain: AUTH_DOMAIN,
        clientID: AUTH_CLIENT_ID,
        clientSecret: AUTH_CLIENT_SECRET,
        callbackURL: AUTH_CALLBACK_URL
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        console.log('profile', profile);
        done(null, {empty: 'empty'});
    }
));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/',
    failureRedirect: 'http://localhost:3000/#/'
}));

app.get('/auth/me', (req, res) => {
    if (!req.user) res.status(404).send('User not found!');
    else res.status(200).send(req.user);
});

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, 'http://localhost:3000/#/');
});

passport.serializeUser((id, done) => {
    done(null, id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

app.listen(PORT, () => { console.log(`Listening on ${PORT}.`); });