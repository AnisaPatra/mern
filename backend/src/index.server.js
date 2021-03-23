const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const paymentoptionsRoutes = require('./routes/payment');
const orderRoutes = require('./routes/order');
const path = require('path');
const cors = require('cors');
mongoose.Promise = global.Promise;

env.config();

//mongoose connection
//mongodb+srv://root:<password>@cluster0.wwlpr.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wwlpr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
});

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api',paymentoptionsRoutes);
app.use('/api/',orderRoutes);
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(process.env.PORT, () => {
    console.log(`Hi server is running on port ${process.env.PORT} `);
});