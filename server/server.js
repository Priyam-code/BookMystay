
require("dotenv").config();
const express = require('express');
const cors=require("cors");
const mongoose=require("mongoose");
const authRoutes=require("./routes/auth.js");
const profileRoutes = require("./routes/profile.js");
const ListingRoutes=require("./routes/listing.routes.js")
const BookingRoutes=require("./routes/bookings.route.js")
const app=express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("api is running"); 
}); 
app.use('/api/auth',authRoutes);
app.use('/api/profile',profileRoutes);
app.use('/api/listings',ListingRoutes);
app.use('/api/bookings',BookingRoutes);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("error connecting to mongodb", err));

app.listen(5000,()=>{console.log("server is running on port 5000")});
