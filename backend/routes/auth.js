const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'sanjayisgoodboy';

//ROUTE:1 Create a user
router.post('/createuser',[
    body('name', 'Enter a valid Name!').isLength({ min: 3 }),
    body('email', 'Enter a valid Email!').isEmail(),
    body('password', 'Enter a valid Password!').isLength({ min: 5 }),
], async (req, res) => {
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    try{
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        //res.send(user);
        res.send({authToken});
    }
    catch(error){
        console.error(error.message)
    }
})

//ROUTE:2 Authenticate a user
router.post('/login',[
    body('email', 'Enter a valid Email!').isEmail(),
    body('password', 'Password cannot be the blank!').exists()
], async (req, res) => {

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({errors: 'Please try with correct credentials!'})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({errors: 'Please try with correct credentials!'})
        }

        const payload = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET)
        //res.send(user);
        res.send({authToken});

    } catch (error) {
        console.error(error.message);
    }
})



//ROUTE:3 Get loggedin user details
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
    }
})
module.exports = router