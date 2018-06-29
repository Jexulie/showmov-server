var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var archiveSchema = new Schema({
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

var Archive = mongoose.model('Archive', archiveSchema);


module.exports = Archive;

module.exports.addArchives = archives => {
    return new Promise((resolve, reject) => {
        archives.save()
            .then(archive => resolve(archive))
            .catch(error => reject(error))
    });
}

module.exports.checkMovie = movie => {
    return new Promise((resolve, reject) => {
        Archive.find({ title: movie.title })
        .then(archive => {
            var result;
            if(Object.keys(archive).length === 0 && archive.constructor){
                result = false;
            }else{
                result = true;
            }
            resolve(result);
        })
        .catch(error => reject(error))
    })
}

module.exports.getArchives = () => {
    return new Promise((resolve, reject) => {
        Archive.find({})
        .then(archive => resolve(archive))
        .catch(error => reject(error))
    });
}