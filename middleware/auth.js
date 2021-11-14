//middleware is just functions that have access to the request and response cycle and object
//first verify the token 
//The Auth middleware is used to authenticate users trying to access private routes. 
//The way the Auth middleware does this is by checking the token located in the header, by checking 
//the value of the key 'x-auth-token'.

const jwt = require('jsonwebtoken')
const config = require('config')

//this is our middle ware function - and what it does is check if there is a token inside of the header
// specfically in out x-auth-token - this all only pertains to protected routes

///next function just says moves onto the next peice of middleware
module.exports = function(req, res, next) {

    //get token from header - send the token as x-auth-token
    const token = req.header('x-auth-token')

    //check if not token
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'})
    }

    //if there is a token verify it
    //pull out the payload
    //set the user the user that is in that payload to request.user
    //so that will have acces to this inside of the route
    //finally we call next

    try{
        //at this point we have the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //once verfied - the payload will be decoded
        req.user = decoded.user;
        next();
    }catch (err) {
        res.status(401).json({msg:'token is not valid'})
    }

}