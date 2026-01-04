const express=require('express');
const router=express.Router();
const Profile=require('../models/profile.js');
const authMiddleware=require('../middleware/auth.middleware.js');

router.get('/',authMiddleware, async (req,res)=>{
try{
const profile=await Profile.findOne({user: req.user.id});
if(!profile) return res.status(404).json({message:"Profile not found"});
res.json(profile);}
catch(error){
    res.status(500).json({message:"Server Error"})
}



})

// check for profile if not exist create one

router.post('/',authMiddleware, async (req,res)=>{
try{
const profiledata={...req.body,user:req.user.id};
const existingProfile= await Profile.findOne({user:req.user.id});
if(existingProfile){
    return res.status(400).json({message:"profile already exists"});
}
const profile= new Profile(profiledata);
await profile.save();
res.status(201).json({profile});}
catch(error){
    return res.status(500).json({message:"Server Error"});
}




});

router.put("/",authMiddleware,async (req,res)=>{
    try {
        const Updateprofile= await Profile.findOneAndUpdate({
            user:req.user.id
        },{
            $set:req.body
        },{new:true});
        if(!Updateprofile){
            return res.status(404).json({message:"Profile not found"});
        }
        res.json({Updateprofile});
    } catch (error) {
            return res.status(500).json({message:"Server Error"});
    }
});

router.delete('/',authMiddleware,async (req,res)=>{
        try {
            const deleteProfile=await Profile.findOneAndDelete({user:req.user.id});
            if(!deleteProfile){
                return res.status(404).json({message:"Profile not found"});

            }
            res.send("Profile deleted");
        } catch (error) {
            return res.status(500).json({message:"Server Error"});
        }
})





module.exports=router;