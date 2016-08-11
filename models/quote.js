/**
 * Created by Kentoy on 8/12/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create schema
var quoteSchema = new Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true },
    movie: { type: String, required: true },
    timestamp: { type: Date, 'default': Date.now }
});

var Quote = mongoose.model('Quote',quoteSchema);

module.exports = Quote;
