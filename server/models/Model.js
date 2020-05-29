const mongoose = require('mongoose');

class Model {

    constructor() {
        this.Schema = mongoose.Schema;
        this.model = mongoose.model;
    }

}
module.exports = Model;
