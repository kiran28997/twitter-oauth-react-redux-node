const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const request = require('request');
const qs = require('querystring');
const twitterConfig = require('./../config/twitter.config.js');

let createToken = function (auth) {
    return jwt.sign({
            id: auth.id
        }, 'secret-token',
        {
            expiresIn: 60 * 120
        });
};

let generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

let sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

router.route('/oauth_request/callback')
    .post(function (req, res) {
        request.post({
            url: 'https://api.twitter.com/oauth/request_token',
            oauth: {
                oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Flogin",
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret
            }
        }, function (err, r, body) {
            if (err) {
                return res.send(500, {message: err.message});
            }

            let reqData = qs.parse(body);
            res.send(reqData);
        });
    });

router.route('/oauth_request')
    .post((req, res, next) => {
        request.post({
            url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
            oauth: {
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret,
                token: req.query.oauth_token
            },
            form: {oauth_verifier: req.query.oauth_verifier}
        }, function (err, r, body) {
            if (err) {
                return res.send(500, {message: err.message});
            }
            let reqData = qs.parse(body);
            req.body['oauth_token'] = reqData.oauth_token;
            req.body['oauth_token_secret'] = reqData.oauth_token_secret;
            req.body['user_id'] = reqData.user_id;

            next();
        });
    }, passport.authenticate('twitter-token', {session: false}), function (req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        return next();
    }, generateToken, sendToken);

router.route('/followers')
    .get(function (req, res, next) {
        let id = req.query.id;
        let token = req.query.token;
        let tokenSecret = req.query.tokenSecret;

        var apiUrl = "https://api.twitter.com/1.1/followers/list.json" + "?"
            + qs.stringify({user_id: id, count: 100});

        var authenticationData = {
            consumer_key: twitterConfig.consumerKey,
            consumer_secret: twitterConfig.consumerSecret,
            token: token,
            token_secret: tokenSecret
        };

        request.get({url: apiUrl, oauth: authenticationData, json: true}, function (err, r, body) {
            if (err) {
                return res.send(500, {message: err.message});
            }
            var followers = [];
            for (let i in body.users) {
                var followerObj = {
                    name: body.users[i].name,
                    handler: body.users[i].screen_name,
                    photo: body.users[i].profile_image_url
                }
                followers.push(followerObj);
            }
            res.json(followers);

        });


    });


module.exports = router;
