const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    fromaddress:{
        type:String,
        required:true,
    },
    toaddress:{
        type:String,
        required:true,
    },
    fromlat:{
        type:String,
        required:true,
    },
    fromlon:{
        type:String,
        required:true,
    },
    tolat:{
        type:String,
        required:true,
    },
    tolon:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        
    },
    no_of_passengers:{
        type:String,
        required:true,
    },
    cost_per_person:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
    }
})
const interCityOffer = mongoose.model('interCityOffer',schema);

module.exports = interCityOffer;