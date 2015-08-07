var Tweets = function () {
};

Tweets.prototype.getTwitterClient = function () {
    var Twitter = require('twitter');
    return new Twitter({
        consumer_key: 'TmWdx5JyrL0bk2PY0R4zWTstY',
        consumer_secret: 'pxdLaxMMvXpCD2dB3ZBJOw52PM9ZYzaH6KDKL9E9FokTKHXfjc',
        access_token_key: '3303844465-7LE2eCegO9FrjnFc47J6tM7foo5Z1vyrw6AgfKx',
        access_token_secret: 'EZjFPyg3wzqeNtXol9nG8qnUg1lyIHRjrjm2UviFbQ8PG'
    });
};

Tweets.prototype.getTweets = function (screenname,callback) {
    var client = this.getTwitterClient();
    var params = {screen_name: screenname};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            // link up @usernames
            tweet.text = tweet.text.replace(/@\w+/g, function (m) {
                return "<a href='/tweets?screenname=" + m + "'>" + m + "</a>";
            });
            // link up urls
            tweet.text = tweet.text.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, function (m) {
                return "<a href='" + m + "' target='_blank'>" + m + "</a>";
            });
            // link up hash tags
            tweet.text = tweet.text.replace(/#\w+/g, function (m) {
                return "<a href='https://twitter.com/hashtag/" + m.substring(1) + "?src=hash' target='_blank'>" + m + "</a>";
            });// https://twitter.com/hashtag/CID234?src=hash
        }
        callback(tweets);
    });
};

Tweets.prototype.getTweetsStream = function (callback) {
    var client = this.getTwitterClient();
    var params = {screen_name: 'mdanational'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        callback(tweets);
    });
};

module.exports = Tweets;



