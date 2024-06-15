const mongoose = require("mongoose");


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connection successfully!`)
    } catch (error) {
        console.log(`error in connection db ${error}`)
    }

}

module.exports =connectDB;