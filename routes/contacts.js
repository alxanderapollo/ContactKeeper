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
//pass two middlewares 1 auth for private routes
//2 check validator the way to do that is to put it in an array
router.post( '/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    //check validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()}); //returns an array with all of the errors
    }

    //pull out the data from the body
    const {name, email,phone, type} = req.body;

    try{
        //if our check validator with the destructred data create a new contact object
        const newContact = new Contact({name, email, phone, type, user: req.user.id})
        //save it to the db 
        const contact = await newContact.save();
        //return it back to the client
        res.json(contact)
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}) 

// @route  PUT api/contact/:id       -> :id is to determine the specfic user to update
// @desc   add new contact
// @access Private 
router.put( '/:id', auth , async (req, res) => {

    const {name, email,phone, type} = req.body;

    //build a contact object
    //anc check for each feild
    const contactFeilds ={};
    if(name) contactFeilds.name = name;
    if(email) contactFeilds.email = email;
    if(phone) contactFeilds.phone = phone;
    if(type) contactFeilds.type = type;

    try{
        let contact = await Contact.findById(req.params.id)

        if(!contact) return res.status(404).json({msg: "No contact found"})

        //make sure user owns contact - so only their own contacts can be upodated
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'not authorized'})
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            {$set: contactFeilds},
            {new: true});
            res.json(contact);
    }catch(e){
        console.error(err.message);
        res.status(500).send('Server Error')

    }
}) 

// @route  Delete api/contact/:id       -> :id is to determine the specfic user to update
// @desc   Delete contact
// @access Private 
router.delete( '/:id', auth, async (req, res) => {


    const {name, email,phone, type} = req.body;

    //build a contact object
    //anc check for each feild
    const contactFeilds ={};
    if(name) contactFeilds.name = name;
    if(email) contactFeilds.email = email;
    if(phone) contactFeilds.phone = phone;
    if(type) contactFeilds.type = type;

    try{
        let contact = await Contact.findById(req.params.id)

        if(!contact) return res.status(404).json({msg: "No contact found"})

        //make sure user owns contact - so only their own contacts can be upodated
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'not authorized'})
        }

        await Contact.findByIdAndRemove(req.params.id)


            res.json({msg:"contact removed"});
    }catch(e){
        console.error(err.message);
        res.status(500).send('Server Error')

    }
    
}) 






//export the router
module.exports = router