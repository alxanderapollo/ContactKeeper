const mongoose = require('mongoose')
const config = require('config') //birng in the varaible we just created
const db = config.get('mongoURI') //grabs the value inside of default.json

const connectDB = async () => {
    try{
        await mongoose.connect(db);
        console.log('MongoDB connected...');
    } catch (err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB