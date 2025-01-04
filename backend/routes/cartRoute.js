const express = require('express');
const cartRoutes = express.Router();
const authMiddleware = require('../middleware/auth');

const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

cartRoutes.post('/add',authMiddleware, addToCart)
cartRoutes.post('/get',authMiddleware, getCart)
cartRoutes.post('/remove',authMiddleware, removeFromCart)

module.exports = cartRoutes;