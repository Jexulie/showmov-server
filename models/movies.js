var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    image: String,
    time: String,
    genre: [],
    score: String,
    director: String,
    stars: [],
    info: String,
    video: String
});

var Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie;

module.exports.fetchMovies = movies => {
    return new Promise((resolve, reject) => {
        movies.save()
            .then(movie => resolve(movie))
            .catch(error => reject(error))
    });
}

module.exports.getMovies = () => {
    return new Promise((resolve, reject) => {
        Movie.find()
            .then(movies => resolve(movies))
            .catch(error => reject(error))
    });
}

module.exports.clearMovies = () => {
    return new Promise((resolve, reject) => {
        Movie.remove({})
            .then(movies => resolve(movies))
            .catch(error => reject(error))
    });
}