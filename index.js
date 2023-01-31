const express = require('express');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const userRouter = require('./server/routes/userRouter');



// ADD THIS
var cors = require('cors');
app.use(cors());

// app.use(function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "http://192.168.190.177:8081");
    
// })

dotenv.config({path:'config.env'})

const PORT = process.env.PORT||8088


const connectDB = require('./server/database/connection')
connectDB();



app.use(morgan('tiny'));

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json())

app.use('/api/user', userRouter);

app.listen(8088, ()=>{console.log(`server running on http://localhost:${PORT}`)});
