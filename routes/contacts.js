//bring in express and router so we can use those things
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator') //validate
const User = require('../models/User')
const auth = require('../middleware/auth')
const Contact = require('../models/Contact')

//4 Main methods for crud 
//get request - fetch data 
//post submit - submit data
//put update  - update data already on the server 
//delete - delete something from the server

//submiting data


// @route  get api/contact
// @desc   get all  users contacts
// @access Private 
router.get( '/', auth, async (req, res) => {
   try{
       const contacts = await Contact.find({user: req.user.id}).sort({date:-1})
       res.json(contacts)
   }catch (err){
       console.error(err.message)
       res.status(500).send('Server Error')
   }
});

// @route  post api/contact
// @desc   add new contact
// @access Private 
router.post( '/', (req, res) => {
    res.send('Add contact')
}) 

// @route  PUT api/contact/:id       -> :id is to determine the specfic user to update
// @desc   add new contact
// @access Private 
router.put( '/:id', (req, res) => {
    res.send('Update contact')
}) 

// @route  Delete api/contact/:id       -> :id is to determine the specfic user to update
// @desc   Delete contact
// @access Private 
router.delete( '/:id', (req, res) => {
    res.send('Delete contact')
}) 






//export the router
module.exports = router