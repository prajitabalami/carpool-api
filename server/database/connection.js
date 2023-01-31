const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGODB_URL_LOCAL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected:${con.connection.host}`);

    }
    catch(err){
        console.log(err)
    }
}

;
module.exports = connectDB;
