const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');

const {User} = require('../model/verifyUserModel');
const {Otp} = require('../model/otpModel');

const nodemailer = require('nodemailer');

const interCityOffer = require('../model/interCityOffer');

module.exports.getsome = async(req,res)=>{
    res.send("Yayyyy")
}

module.exports.signUp = async(req,res) => {

    const email = req.body;
    console.log({email});  
     


    // const user = await User.findOne({
    //     number: req.body.number,
       
    // });
    // if (user) return res.status(400).send("User already registered!");
    // const OTP = otpGenerator.generate(6, {
    //     digits: true,  lowerCaseAlphabets: false, upperCaseAlphabets : false, specialChars: false
    // });

    // const number = req.body.number;
    // const _id = req._id;
    // console.log(OTP);

    // const otp = new Otp({number: number, otp: OTP});
    // const salt = await bcrypt.genSalt(10);
    // otp.otp = await bcrypt.hash(otp.otp, salt);
    // const result = await otp.save();

    // var transporter = nodemailer.createTransport({
    //     host:'smtp.gmail.com',
    //     port:587,
    //     secure: false,
    //     requireTLS:true,
    //     auth:{
    //         user:'prajita.balami@deerwalk.edu.np',
    //         pass:"ljeibasebfiuhvzp"
    //     }
    
    // });
    // var mailOptions = {
    //     from:'prajita.balami@deerwalk.edu.np',
    //     to:`${email}`,
    //     subject:'OTP Verification Code',
    //     text:`Your OTP is ${OTP}`
    
    // }
    // transporter.sendMail(mailOptions, function(error,info){
    //     if(error){
    //         console.log(error);
    //     }
    //     else{
    //         console.log("email has been sent", info.response);
    //     }
    // })


    // return res.status(200).send({"number":req.body.number,"OTP":OTP});
   


}
 
module.exports.verifyOtp = async(req,res) =>{
    const otpHolder = await Otp.find({
        number: req.body.number
    });

    console.log("OTP:",req.body.otp)

    if (otpHolder.length ===0) return res.status(400).send("OTP Expired");
    const rightOtpFind = otpHolder[otpHolder.length-1];
    // console.log({rightOtpFind})
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    // console.log({validUser})
    // console.log("numverrightopt:  ",rightOtpFind.number, req.body.number)

    if (rightOtpFind.number ===req.body.number && validUser){
        const user = new User(_.pick(req.body, ["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDelete = await Otp.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send({
            message: "User Registered Successfully",
            token:token,
            data: result
        });
    }

    else{
        return res.status(401).send({meaasge:"Invalid OTP"});
    }
} 

module.exports.offerInterCity = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Any field cannot be empty" });
        return;
    }

    //new employee
    const offer = new interCityOffer({
        fromaddress: req.body.fromaddress,
        toaddress: req.body.toaddress,
        fromlat: req.body.fromlat,
        fromlon: req.body.fromlon,
        tolat: req.body.tolat,
        tolon: req.body.tolon,
        date: req.body.date,
        no_of_passengers: req.body.no_of_passengers,
        cost_per_person: req.body.cost_per_person,
        userId: req.body.userId,


    })

    //save place in database
    offer
        .save(offer)
        .then(data => {
            res.send(data)
            // res.redirect('/add_user')  //saves all data from form to mongo db
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Something went wrong"
            });

        });

}