const router = require('express').Router();

const Product = require('../models/product');

const upload = require('../middlewears/upload-photo');

const User = require('../models/user');
const verifyToken = require('../middlewears/verify-token');
const verifyTokenSafe = require('../middlewears/verify-token-safe');


// GET request - get all products

router.get("/products", async (req, res) => {
try {
let products = await Product.find()
.populate('owner category').populate("reviews", "rating").exec();

res.json({
    status: true,
    products: products,
});
} catch (err) {
res.status(500).json({
    status: false,
    message: err.message
});
}
})

//Get top selling product
router.get("/top/product", async(req, res) => {
    try{
        let topProduct = await Product.findOne({})
        .sort({amountSold: -1}).populate('category').limit(1)
        .exec();
        if(topProduct){
            res.json({
                product: topProduct,
                success: true
            })            
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// GET request - get a single product
router.get('/product/:id', verifyTokenSafe, async (req, res) => {
try {
    let isFollowing = false;
    let product = await Product.findOne({_id: req.params.id}).populate('category owner reviews.user').populate('reviews', 'rating').exec();


    if(req.decoded !== undefined) {
        let foundUser = await User.findById({_id: req.decoded._id}).populate('following')
        for(let i = 0; i < foundUser.following.length; i++) {
            if(foundUser.following[i]._id.equals(product.owner._id)) {
                isFollowing = true
            };
        }        
        res.json({
            success: true,
            product: product,
            isFollowing: isFollowing
        });
    } else {
        res.json({
            success: true,
            product: product
        })
    }


} catch (err) {
    res.status(500).json({
        status: false,
        message: err.message
    });
}
})

// PUT Request - Update a single product
router.put('/product/:id', upload.single('photo'), async (req, res) => {
try {
let product = await Product.findOneAndUpdate(
    {_id: req.params.id}, 
    {
        $set: {
            title: req.body.title,
            price: req.body.price,
            category: req.body.categoryID,
            photo: req.file.location,
            description: req.body.description,
            owner: req.body.ownerID
        }
    },
    {upsert: true}
);

res.json({
    success: true,
    product: product,
});
} catch (err) {
res.status(500).json({
    success: false,
    message: err.message
});
}
})

// DELETE Request -  Delete a single product
router.delete('/products/:id', async (req, res) => {
try {
let deletedProduct = await Product.findOneAndDelete({_id: req.params.id});
if (deletedProduct) {
    res.json({
        success: true,
        message: "Successfully deleted product"
    });
} else {
    res.json({
        success: false,
        message: "Failed to delete product"
    });
}

} catch (err) {
res.status(500).json({
    success: false,
    message: err.message
})
}
});


module.exports = router;