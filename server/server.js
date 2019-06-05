'use strict';

const http = require('http'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    TwitterTokenStrategy = require('passport-twitter-token'),
    twitterConfig = require('./config/twitter.config.js');

passport.use(new TwitterTokenStrategy({
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    includeEmail: true
},
    function (token, tokenSecret, profile, done) {
        const user = {
            email: profile.emails[0].value,
            username: profile.username,
            displayName: profile.displayName,
            photo: profile.photos[0].value,
            twitterProvider: {
                id: profile.id,
                token: token,
                tokenSecret: tokenSecret
            }
        }
        return done(null, user);
    }));


let app = express();
let server = http.createServer(app);

// enable cors
let corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', require('./routes/auth'));

server.listen(process.env.PORT || 8080, () => {
    console.log('listening...')
})

