const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const Schema = mongoose.Schema;


//Model for users orders
const OrderSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User"},
    dateOrdered: String,
    orderTotalWithShipping: Number,
    products : [
        {
            productID: {type: Schema.Types.ObjectId, ref: "Product"},
            quantity: Number,
            price: Number
        }
    ],
    estimatedDelivery: String
},
{
    timestamps: true
})

//Plugin to get product information on populating data
OrderSchema.plugin(deepPopulate)

module.exports = mongoose.model("Order", OrderSchema);