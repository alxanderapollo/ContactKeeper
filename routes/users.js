//bring in express and router so we can use those things
const express = require('express')
const router = express.Router()

//4 Main methods for crud 
//get request - fetch data 
//post submit - submit data
//put update  - update data already on the server 
//delete - delete something from the server

//submiting data


// @route  Post api/users
// @desc Register a user
// @access Public 
router.post( '/', (req, res) => {
    res.send('Register a user')
}) 


//export the router
module.exports = router