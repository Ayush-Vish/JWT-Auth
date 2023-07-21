const mongoose = require('mongoose')
const connectToDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then((conn) => { 
        console.log("Connected to Database: "+ conn.connection.host)
    }).catch((err) => {
        console.log("Error"  + err)
        process.exit(1)
    })
}
module.exports  = connectToDB