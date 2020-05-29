const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    name: {type: String,required:true},
    age:{type: Number}
})

module.exports = mongoose.model('Author',AuthorSchema);
// const Model = require('./Model');
// class Author extends Model{
//     constructor() {
//         super();
//     }
//
//     schema(){
//         return {
//
//         }
//     }
// }