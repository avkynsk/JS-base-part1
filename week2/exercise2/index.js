/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {

    var hashtagsResult = [];

    for(var i = 0; i < hashtags.length; i++){       
        var hashtag = hashtags[i].toLowerCase(); 
        if(hashtagsResult.indexOf(hashtag) == -1){
            hashtagsResult.push(hashtag);
        }
    }
    return hashtagsResult.join(', ');
};
