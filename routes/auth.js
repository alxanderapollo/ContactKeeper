//login/ authentication route
//bring in express and router so we can use those things
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs') //neded to use for bcrypt
const {check, validationResult} = require('express-validator') //validate
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth') //bring in middle ware for our protected route

//4 Main methods for crud 
//get request - fetch data 
//post submit - submit data
//put update  - update data already on the server 
//delete - delete something from the server

//submiting data

//---------------------------> anytime we need to protect a route we need to bring in our middleware
//to use our middleware just pass it in as a second paramater - auth - after tha ttry going to that route to test
// @route  Get api/auth
// @desc get logged in  user
// @access Private 
//get the user from the database
//if we send the correct token and we are logged in the request object will 
//have the user object attatched to it with the current logged in user id
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/auth
// @desc    auth user and get token
// @access Private 
//validate our email and pass word
router.post( '/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    //just like users we pass in this function to amke sure there arent any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()}); //returns an array with all of the errors
    }

    //take the email and password out of the body for our checks
    const {email, password} = req.body

    try {
        //find the user by email
        let user = await User.findOne({email}) //returns a promise
        //User check  - if it doesnt exist return a 400 with invalid credentials
        if(!user){
            return res.status(404).json({msg: 'Invalid credentials'})
        }

        //if there is a user continue to check the password - using the bycrypt compare method
        //Takes in two things plain text password provided by the body and the hash password is gonna 
        //be the user that was found their password that was stored in the DB
        const isMatch = await bcrypt.compare(password, user.password)

        // Password Check - if the password doesnt match return a 400
        if(!isMatch){
            return res.status(404).json({msg: 'Invalid credentials'})
        }

        //if everything matches return the payload - jwt the token
        const payload = {
            user:{
                id:user.id
            }
        }
        //pass in the payload , secret whcih is in the defualt.json file
      //   expiresIn: 360000 means it'll expire in about an hour after the user has logged in
        jwt.sign(payload,config.get('jwtSecret'), {
          expiresIn: 360000
        }, (err, token) => {
            //if theres an error throw an error
            if (err) throw err ;
            //otherwise return the token which will be our jwt
            res.json({token})
        });
          
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}) 


//export the router
module.exports = router