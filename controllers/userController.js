import User from '../models/userModel.js';

export const createUser=async(req,res)=>{
    const {name,email,phoneNumber}=req.body;
    if(!name || !email ){
        return res.status(400).json({success:false ,message:"Please enter all the required details"})
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({success:false ,message:"User is already existing"})
        }
        const newUser=new User({name , email , phoneNumber});
        await newUser.save();
        return res.status(201).json({success:true, message:"User created", newUser});
    }
    catch(err){
        return res.status(200).json({success: false , message :err.message})
    }
}

export const getUserById=async(req,res)=>{
    const {userId}=req.params;
    const user= await User.findById(userId);

    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({message:"User found",user:{
        name:user.name,
        email:user.email,
        phoneNumber:user.phoneNumber
    }});
}