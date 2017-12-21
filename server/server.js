require('dotenv').config();
const {
    PORT, SECRET, CONNECTION_STRING,
    AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_CALLBACK_URL
} = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use((req, res, next) => {
//   res.set({
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': 'http://localhost:3000',
//     'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
//     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//     'Access-Control-Allow-Credentials': true,
//     'X-XSS-Protection': '1; mode=block',
//     'X-Frame-Options': 'SAMEORIGIN',
//     'Content-Security-Policy': "default-src 'self' unsafe-inline devmountain.github.io"
//   })
//   next();
// });

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 13000 }
}));

app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING).then(db => app.set('db', db));

passport.use(new Auth0Strategy(
    {
        domain: AUTH_DOMAIN,
        clientID: AUTH_CLIENT_ID,
        clientSecret: AUTH_CLIENT_SECRET,
        callbackURL: AUTH_CALLBACK_URL
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        // console.log('\nACCESS TOKEN', accessToken);
        // console.log('\nREFRESH TOKEN', refreshToken);
        // console.log('\nEXTRA PARAMS', extraParams);
        console.log('\nPROFILE', profile);
        // console.log('\nDONE', done);
        const authID = profile.identities[0].user_id;
        app.get('db').get_user_by_auth_id([authID]).then(users => {
            if (users.length) return done(null, users[0].id);
            else done(null, {});
        });
        // const user = profile._json;
        // done(null, user);
    }
));

app.use((req, res, next) => {
    console.log('\n', req.method, req.url);
    // console.log('\nREQ HEADERS:', req.headers);
    console.log('\nREQ SESSION', req.session);
    console.log('\nREQ USER', req.user);
    next();
});

passport.serializeUser((id, done) => {
    // console.log('\nSER ID', id);
    done(null, id);
});
passport.deserializeUser((id, done) => {
    // console.log('\nDES ID', id);
    app.get('db').get_user_by_id([id]).then(users => {
        done(null, users[0])
    });
    // done(null, id);
});

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/info',
    failureRedirect: 'http://localhost:3000/#/',
    failureFlash: true
}));

app.get('/auth/check', (req, res) => {
    console.log('CHECK SESSION', req.session);
    return res.end();
});

app.get('/auth/me', (req, res) => {
    if (!req.user) res.status(404).send('User not found!');
    else res.status(200).send(req.user);
});

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(302, 'http://localhost:3000/#/');
});

app.listen(PORT, () => { console.log(`Listening on ${PORT}.`); });