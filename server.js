const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const JWT = require("jsonwebtoken");
const JWT_SECRET = "Catoon-Duck2";
//const connectDB = require('./config/db');
const mongoose = require('mongoose');

//dot config
dotenv.config();

// mongoose connection
//connectDB();
const DB = 'mongodb+srv://2022a1r059:8rdhBR3uMLjOWZ9Y@bloodbank.lppf54s.mongodb.net/';
mongoose.connect(DB).then(()   =>{
  console.log('Connect to mongodb database ${mongoose.connection.host}');
}).catch((err) => console.log('no connection'));

// rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes 
// 1 test
//app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));


//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log('Node Server Running in ${process.env.DEV_MODE} Modeon Port ${process.env.PORT}'
      .bgBlue.white
    );
});