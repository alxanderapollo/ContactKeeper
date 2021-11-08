//bring in express and router so we can use those things
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator') //validate
const User = require('../models/User')

//4 Main methods for crud 
//get request - fetch data 
//post submit - submit data
//put update  - update data already on the server 
//delete - delete something from the server

//submiting data


// @route  Post api/users
// @desc Register a user
// @access Public 
router.post(
    '/',
    [
      check('name', 'Please add name')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters',
      ).isLength({min: 6}),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()}); //returns an array with all of the errors
      }

      res.send('passed')
}) 


//export the router
module.exports = router