const router = require('express').Router();
const moment = require("moment");
const Stripe = require('stripe')("sk_test_51KJ9lgLpMbUfE9kd1YLxcamNBBuoxYAg1nXGxW3TZG9XDjmnecTvcMb0BlLjx1tACyKqvjWXD2RwyvOI4ErC04V400wXGZIVTG");
const verifyToken = require('../middlewears/verify-token');
const Order = require('../models/order');
const Product = require('../models/product');

const SHIPMENT = {
    normal: {
        price: 13.98,
        days: 7
    },
    fast: {
        price: 49.98,
        days: 3
    }
}

function shipmentPrice(shipmentOption) {
    let estimated = moment().add(shipmentOption.days, "d").format("dddd MMMM Do")

    return {estimated, price: shipmentOption.price}
}



router.post('/shipment', (req, res) => {
    let shipment;
    if(req.body.shipment === "fast") {
        shipment = shipmentPrice(SHIPMENT.fast)
    } else {
        shipment = shipmentPrice(SHIPMENT.normal)
    }

    res.json({ success: true, shipment: shipment})
})

//Route to get payment information from the app user
//Creates stripe customer 
router.post('/payment', verifyToken, (req, res) => {
    let totalPrice = Math.round(req.body.totalPrice * 100);
    let updateProductID;
    let updateProductQuantity = 0;

    Stripe.customers.create({
        email: req.decoded.email
    }).then(customer => {
        return Stripe.customers.createSource(customer.id, {
            source: "tok_visa"
        });
    }).then(source => {
        return Stripe.charges.create({
            amount: totalPrice,
            currency: "usd",
            customer: source.customer
        })
    }).then(async charge => {
        let order = new Order();
        let cart = req.body.cart;

        cart.map(async (product) => {
            updateProductID = product._id;
            updateProductQuantity = product.quantity;
            order.products.push({
                productID: product._id,
                quantity: parseInt(product.quantity),
                price: product.price
            });
        });
        order.owner = req.decoded._id;
        order.estimatedDelivery = req.body.estimatedDelivery;
        order.dateOrdered = req.body.dateOrdered,
        order.orderTotalWithShipping = req.body.orderTotalWithShipping
        await order.save()
        await Product.findOneAndUpdate({_id: updateProductID},  {$inc: { amountSold: updateProductQuantity } })
        res.json({
            success: true,
            message: "successfully paid for order"
        })
    }).catch(err => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
})


module.exports = router;