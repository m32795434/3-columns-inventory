//DATABASE CONEXION

const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/inventory";

mongoose
    //we conect to the DB using the URL
    .connect(URL,{
        //we delete the warnigns messages
        useUnifiedTopology: true,
        useNewUrlParser: true,
        //without this property, findByIdAndUpdate() will not work
        useFindAndModify: false,
    })
    .then((db)=>console.log('DB is connected'))
    .catch((err)=>console.error('Failed to connect to MongoDB:',err));
module.exports = mongoose;