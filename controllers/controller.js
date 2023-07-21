const User = require('../models/usermodel.schema.js')
const emailValidator = require('email-validator')
const bcrypt = require("bcrypt")
exports.signup = async (req ,res , next) => {
    try{
        const {name ,email, password, confirmpassword} = req.body
        console.log(name ,email, password, confirmpassword)
        if(!name || !email || !password || !confirmpassword) {
            res.status(400).json({
                success:false,
                message:"Please fill all fields"
            })
            throw new Error("Please fill out all fields")
        }
        if(password !== confirmpassword) {
            res.status(400).json({
                success:false, 
                message:"Password does not matched"
            })
            throw new Error("Password not matched")
        }
        const validEmail = emailValidator.validate(email)
        if(!validEmail) {
            res.status(400).json({
                success:false,
                message:'Please provide a valid Email'
            })
            throw new Error('Please provide a valid Email')
        }
        const userExists = await User.find({email:email}) 
        if(userExists.length === 0 ) {
            const user  =await User.create({
                name,
                email,
                password,
                confirmpassword
            })
            res.status(200).json({
                success:true,
                message:"User created Successfully",
                user
            })
        } else {
            res.status(400).json({
                success:false,
                message:"User already Exists"
            })
            throw new Error("User already Exists")
        }
    }
    catch(error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
    
}
exports.signin  = async(req , res, next ) =>{
    try {
        const {email , password}  = req.body
        const user = await User.
            findOne({
                email:email
            })
            .select('+password')

        if(!user ||await bcrypt.compare(password ,user.password)) {
            return res.status(400).json({
                success:false,
                message:'Invalid Credentials'
            })
        }
        const token  = user.jwtToken();
        user.password = undefined;
        user.confirmpassword  =undefined
        const cookieOption = {
        
            maxAge:24*60*60*1000,
            httpOnly:true
        }
        res.cookie("token" ,token , cookieOption)
        res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:error.message
        })   
    }
}
exports.getUser = async (req, res,next) =>{
    
    const userId=  req.user.id
    console.log(userId)
    try {
        console.log("YAha tak ")
        const user = await User.find({_id:userId})
          res.status(200).json({
            success:true, 
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Invalid Credentials"
        })
    }
}

exports.logout = async (req, res, next) =>{
    try {
        const cookieOptions = {
            expires:new Date(),
            httpOnly:true
        }
        res.cookie("token", "Hello Bro ", cookieOptions)
        res.status(200) .json({
            success:true,
            message:"Logged Out"
        })
    }
    catch(error ) {
        res.status(400).json ({
            success:false, 
            message:e.message
        })
    }
}