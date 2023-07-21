const express= require('express')
const {signup,signin , getUser ,logout}  = require('../controllers/controller.js')
const jwtAuth = require('../middleware/jwtAuth.js')
const router = express.Router()

// Make a new User
router.post('/signup' ,signup )
router.post('/signin' ,signin )
// getUser pahuchne se pahele sabse pahele jwtAuth middleware se hoke juzre 
// Where we will authenticate the User and Try to retrieve some info  
router.get('/user', jwtAuth ,getUser)
router.get('/logout' , logout )
module.exports = router 