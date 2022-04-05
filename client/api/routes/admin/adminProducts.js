const router = require('express').Router()
const verifyAdminToken = require('../../middlewears/verify-token-admin')
const Product = require('../../models/product');
const Category = require('../../models/category');
const upload = require('../../middlewears/upload-photo');
const e = require('express');


// GET Route to get product for admin user

router.get('/admin/product/:productID', verifyAdminToken, async (req, res) => {
    try {
        let foundProduct = await Product.findById({_id: req.params.productID});
        let foundCategories = await Category.find();
        if(foundProduct) {
            res.json({
                success: true,
                product: foundProduct,
                categories: foundCategories
            })
        } else {
            res.json({
                success: false,
                message: "Couldn't find product"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// POST request - create a new product


// title: String,
// description: String,
// photo: String,
// price: Number,
// stockQuantity: Number,
// rating: [Number]



router.post('/products', upload.single('photo'), verifyAdminToken, async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.stockQuantity =  req.body.stockQuantity;
        product.owner = req.body.ownerID;
        product.category = req.body.categoryID;


        await product.save();

        res.json({
            status: true,
            message: 'Successfully saved'
        }) 


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})






// PUT Request - Update a single product
router.put('/product/:id', upload.single('photo'), verifyAdminToken, async (req, res) => {
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
router.delete('/products/:id', verifyAdminToken, async (req, res) => {
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