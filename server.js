//modules are brought it in like this becasue node has a diffrent way to bring in modules
//to use the import syntax you have to rbing in the babel 
const express = require('express');
const connectDB = require('./config/db')

const app = express();

//ConnectDB
connectDB()

//return hellow world when the server is up and i hit the / endpoint
app.get('/', (req, res) => {res.json({msg:'Welcome to the ContactKeeper API'})})


//Define our routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//looks for env var called port first - and it will be used in production or we can use 5000
const PORT = process.env.PORT || 5000;

//takes in a port to listen in
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));