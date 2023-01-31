const express = require('express');
const route = express.Router();


const { signUp, verifyOtp,offerInterCity, getsome} = require('../controller/userController');


//API
// route.use(express.json());

route.route('/signup')
    .post(signUp);
route.route('/verify')
    .post(verifyOtp);
route.route('/offerInterCity').post(offerInterCity);
route.route('/getsome').get(getsome);



module.exports = route;