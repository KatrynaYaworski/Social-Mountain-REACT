require('dotenv').config() // not needed in this file since we made this step previously. But it is setting the environment variables based on .env
const jwt = require('jsonwebtoken') // this brings in the jwt library
const {SECRET} = process.env // this brings in the secret variable from process.env

module.exports = { //exporting the functions so that they are accessible in other files.
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization') //saving the authorization header into the variable headerToken. 

        if (!headerToken) { // if there is not an authorized token then send error
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token //declare the uninitialized variable 'token'

        try { 
            token = jwt.verify(headerToken, SECRET) //if jwt.verify does not error then verify that the token is valid using the secret.
        } catch (err) {
            err.statusCode = 500 // if error send 500 code and throw error. 
            throw err // - will crash server if it errors.
        }

        if (!token) { // if there is no assignment to token then throw 'not authenticated error'
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next() // since this is a middleware this allows node to continue down the event chain. Otherwise it would stop.
    }
}