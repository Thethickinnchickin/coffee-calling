const router = require('express').Router()
const User = require("../models/user");
const verifyToken = require('../middlewears/verify-token')

const jwt = require('jsonwebtoken')


//Route to sign up for the app
router.post('/auth/user/signup', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, message: "Please enter email or password"});
    } else {
        try {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password
            await newUser.save();
            let token = jwt.sign(newUser.toJSON(), "123123544444324151645252asdfasdfasdfafasysbgfdd", {
                expiresIn: 604000 //1 Week
            })

            res.json({
                success: true,
                token: token,
                message: "Successfully created a new user"
            })
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    }

    res.json({
        success: true,
        message: "hey there"
    })
})

//Login Route
router.post("/auth/login", async (req, res) => {
    try {
        let foundUser = await User.findOne({email: 'matt@email.com' })
        if (!foundUser) {
            res.status(403).json({
                success: false,
                message: "Authentication failed, User not found"
            })
        } else {
            if(foundUser.comparePassword('Matt1234')) {
                let token = jwt.sign(foundUser.toJSON(), "123123544444324151645252asdfasdfasdfafasysbgfdd", {
                    expiresIn: 604800 // 1 week
                })

                res.json({success: true, token: token})                
            } else {
                res.status(403).json({
                    success: false,
                    message: "Authentication failed password incorrect"
                })
            }

        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed"
        })
    }
})

// Profile Route 
router.get("/auth/user", verifyToken, async(req, res) => {
    try {
        let foundUser = await User.findOne({_id: req.decoded._id}).populate('address').exec();
        if (foundUser) {
            res.json({
                success: true,
                user: foundUser
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})



module.exports = router;