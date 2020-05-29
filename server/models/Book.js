const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {type: String,required:true},
    genre:{type:mongoose.Schema.Types.ObjectId, ref:'Genre'},
    author:{type: mongoose.Schema.Types.ObjectId, ref:'Author'}
})

module.exports = mongoose.model('Book',bookSchema);
