//bring in express and router so we can use those things
const express = require('express')
const router = express.Router()

//4 Main methods for crud 
//get request - fetch data 
//post submit - submit data
//put update  - update data already on the server 
//delete - delete something from the server

//submiting data


// @route  Get api/auth
// @desc get logged in  user
// @access Private 
router.get( '/', (req, res) => {
    res.send('Get logged in user')
}) 

// @route  POST api/auth
// @desc    auth user and get token
// @access Private 
router.post( '/', (req, res) => {
    res.send('Log in user')
}) 






//export the router
module.exports = router