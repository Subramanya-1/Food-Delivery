const express = require('express');
const orderRouter = express.Router();
const {placeOrder,verifyOrder,userOrders} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

orderRouter.post('/place', authMiddleware,placeOrder);
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/userorders',authMiddleware,userOrders)

module.exports = orderRouter;