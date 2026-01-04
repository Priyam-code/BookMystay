const mongoose= require("mongoose");

const listingSchema= new mongoose.Schema({
    title:String,
    Description:String,
    location:String,
    price: Number,
    Images:[String],
    HostId:{type :mongoose.Schema.Types.ObjectId,ref:"User"},
    bookingDates:[{start:Date,end:Date}],


})

module.exports= mongoose.model('Listings',listingSchema);