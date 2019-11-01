/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {

    var tweetMass = tweet.split(' ');
    var hashtags = [];
    
    for (var i = 0; i < tweetMass.length; i++){
        var tw = tweetMass[i];
        
        if (tw.startsWith('#')){
            tw = tw.slice(1);
            hashtags.push(tw);
        }
    }

    return hashtags;
};
