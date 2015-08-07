var Tweets = require('../appmodules/tweets');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var screenname = req.query.screenname == "" ? "andles" : req.query.screenname
    var t = new Tweets();
    t.getTweets(screenname, function (tweets) {
        res.render('tweets', {title: 'Tweets', tweetArr: tweets});
    });
});

module.exports = router;