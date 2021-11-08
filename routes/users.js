//bring in express and router so we can use those things
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
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
      //if there are no errors and all of the information has been appropriately enterd this message will be returned
    //   res.send('passed')
    //the req.body returns all of the below params
    //now the request.body has the name, email, and password so it can be destructured
    const {name, email, password} = req.body

    try{
        //this means find the user by email
        let user = await User.findOne({email})
        //if the user exists throw this error
        if(user){
            return res.status(400).json({msg: 'User already exists'})
        }

        //if the user doesnt exist take the user var and create a new user with it
        user = new User({name, email, password});

        //add to the database and enxrypt
        //but before that we need to encrypt the password with bcrypy

        //salt is used to encrypt the password
        const salt = await bcrypt.genSalt(10) //takes ten rounds - in otherwords determins how secure the password is
        //currently plain text - bcrupt turns into a has with the pass word and salt
        user.password = await bcrypt.hash(password,salt)
        //finally we save the instance into the DB
        await user.save()

        res.send('User saved')//to test and check




    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error')

    }
}) 


//export the router
module.exports = router