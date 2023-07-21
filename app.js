const express = require('express')
require('dotenv').config()
const cors= require('cors')
const connectToDB = require('./configDB/db.js')
const app = express()
const cookieParser  = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
// app.use(express.urlencoded())    
app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials:true
}))

connectToDB()
const userRoutes=  require('./routes/route.js')

// app.use('/', (req,res)=>{
//     res.status(200).json({
//         data:'JWT Auth Server'`
//     })
// })
app.use('/api/auth' , userRoutes) 


module.exports = app 