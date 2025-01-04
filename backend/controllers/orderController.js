const orderModel = require('../model/orderModel');
const userModel = require('../model/userModel');
const stripe = require('stripe')



const placeOrder = async (req, res) => {

    try {
        const frontend_url = "http://localhost:5173"
        const newOrder=orderModel.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:[]})
        
        const line_items = req.body.items.map(item => {
            price_data={
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100,
            },
            quantity=item.quantity
        })
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: 2*100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.status(200).json({success:true, session_url:session.url})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: error.message})
        
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{status: true})
            res.json({success:false,message:"Not Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
}
}

 const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.params.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
 }
module.exports = {placeOrder,verifyOrder,userOrders}