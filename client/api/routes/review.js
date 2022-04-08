const router = require('express').Router();
const Review = require('../models/review');
const Product = require('../models/product');
const upload = require('../middlewears/upload-photo');
const verifyToken = require('../middlewears/verify-token')



//Route that post review to product from user
router.post("/reviews/:productID", verifyToken, upload.single("photo"), async (req, res) => {
    try {
        let review = new Review({
            headline: req.body.headline,
            body: req.body.body,
            rating: req.body.rating,
            photo: req.file.location,
            productID: req.params.productID,
            user: req.decoded._id
        })

        await Product.findOneAndUpdate({_id: req.params.productID},{ $push: { rating: review.rating, reviews: review._id }});
        
        await review.save();

        res.json({
            success: true,
            review: review
        })            
        

        
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})

//Route to get all views from a single product
router.get("/reviews/:productID", async (req, res) => {
    try {
        let product = await Review.find({productID: req.params.productID}).populate('user').exec()

        res.json({
            success: true,
            reviews: product
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;