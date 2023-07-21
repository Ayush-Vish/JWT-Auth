const app = require('./app.js')

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is listening at http://localhost:${PORT}`)
})
