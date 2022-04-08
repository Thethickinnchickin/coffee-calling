// api/index.js

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()

//Connecting to Mongoose
mongoose.connect(
    process.env.DATABASE,
    {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err) {
            console.log($PORT)
            console.log(err)
        } else {
            console.log("You have connected to the database");
        }
    } 
)

//Middlewears
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));



//Getting Api Routes
const ProductRoutes = require('./routes/product');
const OwnerRoutes = require('./routes/owner');
const CategoryRoutes = require('./routes/category');
const PaymentRoutes = require('./routes/payment');
const AuthRoutes = require('./routes/auth');
const ReviewRoutes = require('./routes/review');
const AddressRoutes = require('./routes/address');
const CountriesRoutes = require('./routes/country');
const OrdersRoutes = require('./routes/orders')
const SearchRoutes = require('./routes/search');
const CoffeeRoutes = require('./routes/coffee');
const CoffeeProductsRoutes = require('./routes/coffeeProducts');
const MerchandiseRoutes = require('./routes/merchandise');
const CoffeeHomeRoutes= require('./routes/home/coffeeHome')
const CofeeProductsHomeRoutes = require('./routes/home/coffeeProductHome');
const FollowingRoutes = require('./routes/followers');
const AdminAuthRoutes = require('./routes/admin/adminAuth');
const AdminProductsRoutes = require('./routes/admin/adminProducts');


app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }))
app.use('/api', AdminAuthRoutes);
app.use('/api', AdminProductsRoutes);
app.use('/api', SearchRoutes);
app.use('/api', OrdersRoutes);
app.use('/api', CountriesRoutes);
app.use('/api', AddressRoutes);
app.use('/api', ReviewRoutes);
app.use('/api', AuthRoutes);
app.use('/api', OwnerRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', ProductRoutes);
app.use('/api', PaymentRoutes);
app.use('/api', CoffeeRoutes);
app.use('/api', CoffeeProductsRoutes);
app.use('/api', MerchandiseRoutes);
app.use('/api', CoffeeHomeRoutes);
app.use('/api', CofeeProductsHomeRoutes);
app.use('/api', FollowingRoutes);





//Create app listening on port 3000 on localhost
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Listening on port ${process.env.PORT}`)
    }
})

module.exports = app