const router = require('express').Router();
const User = require('../models/user');
const Owner = require('../models/owner');
const verifyToken = require('../middlewears/verify-token');


//Route Setting Follower for User
router.put('/followers/:ownerID', verifyToken, async (req, res) => {
    try{
        const owner = await Owner.findById(req.params.ownerID);
        const foundUser = await User.findById({_id: req.decoded._id})
        if(owner && foundUser) {
            if(foundUser.following.includes(req.params.ownerID)) {
                return res.json({
                    success: "true",
                    message: "User already followed"
                })
            }
            await foundUser.following.push(owner._id)
            await foundUser.save()
            res.json({
                success: true,
                user: foundUser
            })
        } else {
            console.log("Already following user")
        }        
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

});

//Route to unfollow an owner
router.post('/followers/remove/:ownerID', verifyToken, async (req, res) => {
    const foundUser = await User.findById({_id: req.decoded._id})
    if(foundUser) {
        foundUser.following.remove(req.params.ownerID);
        await foundUser.save();

        res.json({
            success: true,
            user: foundUser
        })
    }
})

//GET Route to get all owners followed by user
router.get('/followers', verifyToken, async(req, res) => {
    try {
        let foundUser = await User.findById({_id: req.decoded._id}).populate('following').exec();
        res.json({
            success: true,
            user: foundUser
        })
    } catch (err) {
        res.status({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;