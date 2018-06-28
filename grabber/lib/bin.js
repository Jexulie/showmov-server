// var $ = cheerio.load(res.data);
//         var movieList = [];
//         $('.list_item').each(function () {
//             // TODO: check if its empty
//             var selector = $(this);
//             /* Find Title */
//             var title = selector.find('h4').children('a').text();
//             /* Find Image */
//             var image = selector.find('img').attr('src');
//             /* Find Time */
//             var time = selector.find('time').text();
//             /* Find Genre */
//             var genre = selector.find('[itemprop=genre]').text();
//             /* Find Score */
//             var score = selector.find('.metascore').text();
//             /* Find Director */
//             var director = selector.find('[itemprop=director]').children('[itemprop=name]').text();
//             /* Find Stars */
//             var stars = selector.find('[itemprop=actors]').children('[itemprop=name]').text();
//             /* Find Info */
//             var info = selector.find('[itemprop=description]').text();
//             /* Find Video */
//             var video = `https://www.imdb.com${selector.find('[itemprop=trailer]').attr('href')}`;          
//             var obj = {
//                 title: title,
//                 image: image,
//                 time: time,
//                 genre: genre,
//                 score: score,
//                 director: director,
//                 stars: stars,
//                 info: info,
//                 video: video
//             }
//             movieList.push(obj)
//         });



// https://www.imdb.com/movies-in-theaters/  -- .list_item

// https://www.imdb.com/movies-coming-soon/?ref_=inth_cs
