const router = require("express").Router();
const Address = require("../models/address");
const verifyToken = require("../middlewears/verify-token");
const User = require('../models/user')

//Route to create a new address and load it into database
router.post("/address", verifyToken, async (req, res) => {
    try {
        let address = new Address();
        address.user = req.decoded._id;
        address.country = req.body.country;
        address.fullName = req.body.fullName;
        address.streetAddress = req.body.streetAddress;
        address.city = req.body.city;
        address.state = req.body.state;
        address.zipCode = req.body.zipCode;
        address.phoneNumber = req.body.phoneNumber;
        address.deliveryInstruction = req.body.deliveryInstruction;
        address.securityCode = req.body.securityCode;

        await address.save();
        res.json({
            success: true,
            address: address
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


//Route to get users addresses
router.get("/address", verifyToken, async (req, res) => {
    try {
        let addresses = await Address.find({user: req.decoded._id});

        res.json({
            success: true,
            addresses: addresses
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

});

//Route to edit existing address
router.put("/address/:id", verifyToken, async (req, res) => {
    try {
        let address = await Address.findByIdAndUpdate({_id: req.params.id},{
            $set: {
                user: req.decoded,
                country: req.body.country,
                fullName: req.body.fullName,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                phoneNumber: req.body.phoneNumber,
                deliveryInstruction: req.body.deliveryInstruction,
                securityCode: req.body.securityCode                
            }

        },
        )

        await address.save()
        res.json({
            success: true,
            address: address
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Route to set the address to be the users default
router.put("/address/set/default",verifyToken, async (req, res) => {
    try {
        const doc = await User.findOneAndUpdate({ _id: req.decoded._id}, { $set: { address: req.body.id }});
        if(doc) {
            res.json({
                success: true,
                message: "Successfully made address main"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


//Route to get a single address
router.get("/address/:id", async (req, res) => {
    try {
        let response = await Address.findOne({_id: req.params.id})
        res.json({
            success: true,
            address: response
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Route to delete an address
router.delete("/address/:id", verifyToken, async (req, res) => {
    try{
        let deletedAddress = await Address.findOneAndDelete({_id: req.params.id});

        if(deletedAddress) {
            res.json({
                success: true,
                message: "Successfully deleted Address"
            })
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;