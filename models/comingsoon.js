var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comingsoonSchema = new Schema({
    title: String,
    image: String,
    time: String,
    genre: String,
    score: String,
    director: String,
    stars: String,
    info: String,
    video: String
});

var Comingsoon = mongoose.model('Comingsoon', comingsoonSchema);


module.exports = Comingsoon;

module.exports.fetchComingsoons = comingsoons => {
    return new Promise((resolve, reject) => {
        comingsoons.save()
            .then(movie => resolve(movie))
            .catch(error => reject(error))
    });
}

module.exports.getComingsoons = () => {
    return new Promise((resolve, reject) => {
        Comingsoon.find()
            .then(comingsoons => resolve(comingsoons))
            .catch(error => reject(error))
    });
}

module.exports.clearComingsoons = () => {
    return new Promise((resolve, reject) => {
        Comingsoon.remove({})
            .then(comingsoons => resolve(comingsoons))
            .catch(error => reject(error))
    });
}