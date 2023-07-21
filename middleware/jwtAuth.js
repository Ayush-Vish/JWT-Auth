const JWT = require('jsonwebtoken')

const jwtAuth = (req ,res, next ) => {
    // All the data between and cookie are stored in serialized form 
    // So we have to convert it into JSON Format 
    // So we use cookie-parser for it in app.js

    const token= (req.cookies  && req.cookies.token) || null
    if(!token ) 
    {
        return res.status(400).json({
            success:false,
            message:"Not Authorized"
        })
    }
    try {

        
        const payload= JWT.verify(token ,process.env.SECRET)
        req.user = {id: payload.id , email: payload.email}

    }catch(error) {
        res.status(400).json({
            success:false,
            message:error.message
        })

    }




    // This is for going to getUser

    next()
    
}
module.exports = jwtAuth