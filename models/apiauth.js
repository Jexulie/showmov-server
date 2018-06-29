var mongoose = require('mongoose');
var hat = require('hat');
var Schema = mongoose.Schema;

var apiauthSchema = new Schema({
    apikey: String,
});

var Apiauth = mongoose.model('Apiauth', apiauthSchema);


module.exports = Apiauth;

module.exports.generateKey = () => {
    return new Promise((resolve, reject) => {
        var newKey = new Apiauth({ apikey: hat() });
        newKey.save()
            .then(user => resolve(user))
            .catch(error => reject(error))
    });
}

module.exports.autherize = apikey => {
    return new Promise((resolve, reject) => {
        Apiauth.find({apikey: apikey})
            .then(user => {
                var check = true;
                if(Object.keys(user).length === 0 && user.constructor){
                    check = false;
                }
                resolve(check)
            })
            .catch(error => reject(error))
    });
}