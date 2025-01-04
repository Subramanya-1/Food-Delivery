const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    status:{type:String, defaoult:'Food processing'},
    date:{type:Date,default:Date.now()},
    payment:{type:String,defaoult:false}


})

const orderModel = mongoose.models.Order || mongoose.model('order',orderSchema);
module.exports = orderModel;