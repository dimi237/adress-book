const mongoose = require('mongoose');

const adressSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: Number, required: true },
});

module.exports = mongoose.model('Adress', adressSchema);