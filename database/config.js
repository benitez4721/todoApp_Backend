
const mongoose = require('mongoose')
require('dotenv').config()


mongoose.set('useFindAndModify', false);

const dbconnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("Database Online");
    } catch (error) {
        console.log("error");
        throw new Error("Error at start database connection")
    }
}

module.exports = {
    dbconnection
}