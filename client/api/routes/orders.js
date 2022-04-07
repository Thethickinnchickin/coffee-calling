const router = require('express').Router();
const verifyToken = require('../middlewears/verify-token');
const Order = require('../models/order');
const moment = require('moment')

//Route that gets orders for user
//returns orders products
router.get('/orders', verifyToken, async(req, res) => {
    try {

        let foundOrders = await Order.find({owner: req.decoded._id})
        .deepPopulate("owner products.productID.owner").sort({createdAt: -1}).exec()

        res.json({
            success: true,
            orders: foundOrders
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})



module.exports = router;