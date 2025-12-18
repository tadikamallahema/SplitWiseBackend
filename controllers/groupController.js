import Group from '../models/groupModel.js';

export const createGroup=async(req,res)=>{
    const{groupName,members,createdBy}=req.body;
    if(!groupName || !members || !createdBy){
        return res.status(400).json({success:false, message :"All fields are required "})
    }
    try{
        if(!members.includes(createdBy)){
            members.push(createdBy)
        }
        const newgroup=await Group.create({groupName, members,createdBy});
        //newgroup.save();
        return res.status(201).json({success:true,message:"new Group is created ",newgroup})

    }catch(err){
        return res.status(500).json({success:false, message:err.message})
    }
}