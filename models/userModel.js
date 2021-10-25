const { model, Schema } = require('mongoose');

const userSchema = Schema({
    role: { type: String, required: 'path: {PATH} - es requerido value: {VALUE} -'  },
    language: [String],
    email: String,
    name: String,
    lastname: String,
    currency: {
            code: { type: String},
            name: { type: String},
            symbol: { type: String}
        },
    country: String,
    countryCode: String,
    countryCodeName: String,
    phone: Number
});


module.exports = model('user', userSchema);