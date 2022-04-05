const router = require('express').Router();

const Product = require('../models/product');

//Getting all coffee products
//Returns products with category 'Coffee'
router.get('/coffee/products', async(req, res) => {
    try {
        let productsByCategory = await Product.where('category').equals('6237c0daddbb11c5b319f44f')
        .populate('owner category').populate("reviews", "rating").sort('-amountSold').exec()

        res.json({
            success: true,
            products: productsByCategory
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;