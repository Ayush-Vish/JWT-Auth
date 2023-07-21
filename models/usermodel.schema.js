const mongoose  =require('mongoose')
const JWT  = require('jsonwebtoken')
const bcrypt  = require('bcrypt')
const signUpSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Name is required for SignUp"],
        trim:true,
        minLength:[3, 'Name must be at least 3 character']
    },
    email:{
        type:String,
        require:[true,"Name is required for SignUp"],
        unique:[true, 'User already SignIn'], 
        lowercase:true,

    },
    password:{
        type:String,
        require:[true,"Password is required for further Process"],
        select:false
    },
    confirmpassword: {
        type:String,
        require:[true,"Password is required for further Process"],
        select:false

    },
    forgotpasswordtoken : {
        type:String
    },
    forgotpasswordexpirydate :{
        type:Date
    }

},{
    timestamps : true
})

// Hashing the Password Using bcrypt
// Custom me predefined Middleware
signUpSchema.pre('save' ,async function (next) {
    if(!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password , 10)
    
    return next()
})



// Defining a method to Generate JWT Token 
signUpSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id:this._id , emali:this.email},
            process.env.SECRET,
            {expiresIn : '24h'}
        )

    }
}

// const signInSchema = new mongoose.Schema({
    
// }) 
module.exports = mongoose.model("User" , signUpSchema)

