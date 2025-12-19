import Balance from "../models/balanceModel.js";
import { simplifyBalances } from "../service/balanceService.js";
// import Settlement from "../models/settlementModel.js"; // optional

export const settleUp = async (req, res) => {
  try {
    const { fromUser, toUser, amount, groupId } = req.body;

    if (!fromUser || !toUser || !amount) {
      return res.status(400).json({
        success: false,
        message: "fromUser, toUser and amount are required"
      });
    }
    if (amount <= 0) {
      return res.status(400).json({success: false,message: "Amount must be greater than zero"});
    }
    const balance = await Balance.findOne({
      fromUser,
      toUser,
      ...(groupId && { groupId })
    });

    if (!balance) {
      return res.status(404).json({success: false,message: "No outstanding balance found"});
    }
    if (amount > balance.amount) {
      return res.status(400).json({success: false,message: "Settlement amount exceeds outstanding balance"});
    }
    balance.amount -= amount;

    if (balance.amount === 0) {
      await Balance.deleteOne({ _id: balance._id });
    } else {
      await balance.save();
    }

    return res.status(200).json({success: true,message: "Settlement successful"});
  } catch (err) {
    return res.status(500).json({success: false,message: err.message});
  }
};

export const getUserBalance=async(req,res)=>{
  const {userId}=req.params;
  try{
    const youOwe=await Balance.find({fromUser:userId}).populate("toUser","name email");
    const youAreOwed=await Balance.find({toUser:userId}).populate("fromUser","name mail");

    return res.status(200).json({success:true,message:"success",youOwe,youAreOwed})
  }catch(err){
    return res.status(500).json({success:false , message:err.message})
  }
}


export const simplifyGroupBalances = async (req, res) => {
  try {
    const { groupId } = req.params;

    await simplifyBalances(groupId);

    return res.status(200).json({ success: true, message: "Balances simplified successfully"});
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

