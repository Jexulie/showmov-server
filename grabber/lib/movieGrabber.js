var cheerio = require('cheerio');
var request = require('request');


function movieGrabber(callback){

    var url = 'https://www.imdb.com/movies-in-theaters';

    request.get(url, function(err, res, body){
        var movieList = []
        var $ = cheerio.load(body);
        $('.list_item').each(function () {
            // TODO: check if its empty
            var selector = $(this);
            /* Find Title */
            var title = selector.find('h4').children('a').text().trim();            
            /* Find Image */
            var image = selector.find('img').attr('src').trim();
            /* Find Time */
            var time = selector.find('time').text().trim();
            /* Find Genre */
            var genre = [];
            selector.find('[itemprop=genre]').each(function(){
                genre.push($(this).text().trim());
            });
            /* Find Score */
            var score = selector.find('.metascore').text().trim();
            /* Find Director */
            var director = selector.find('[itemprop=director]').children('[itemprop=name]').text().trim().replace(/\n/g, '');
            /* Find Stars */
            var stars = [];
            selector.find('[itemprop=actors]').children('[itemprop=name]').each(function(){
                stars.push($(this).text().trim().replace(/\n/g, ''));
            });
            /* Find Info */
            var info = selector.find('[itemprop=description]').text().trim();
            /* Find Video */
            var video = `https://www.imdb.com${selector.find('[itemprop=trailer]').attr('href').trim().replace(/\n/g, '')}`;
            
            var obj = {
                title: title,
                image: image,
                time: time,
                genre: genre,
                score: score,
                director: director,
                stars: stars,
                info: info,
                video: video
            }
            movieList.push(obj)
        });
        callback(movieList)
    }); 
}

module.exports = movieGrabber;
