const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InformShema = new Schema( {
    text: {
        type: String,
        required: true
    },
})
mongoose.model('information', InformShema)