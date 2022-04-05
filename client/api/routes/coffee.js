const router = require('express').Router();

const Product = require('../models/product');

//Getting all coffee products
//Returns products with category 'Coffee'
router.get('/coffee', async(req, res) => {
    try {
        let productsByCategory = await Product.where('category')
        .equals('6236b2d0bce919f6a64ecac6')
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
