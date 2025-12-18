import Group from "../models/groupModel.js";
import Expense from "../models/expenseModel.js";
import Balance from "../models/balanceModel.js";

export const addExpenses=async(req,res)=>{
    const {groupId}=req.params;
    const {totalAmount,paidBy,splitType,splits}=req.body;
try{
    if(!groupId || !totalAmount || ! paidBy || ! splitType){
        return res.status(400).json({success:false, message :"Missing required fields"});
    }
    const group=await Group.findById(groupId);
    if(!group){
        return res.status(404).json({message:"Group Not found"});
    }
    if(!group.members.includes(paidBy)){
        console.log("Not found");
        return res.status(400).json({ message: "Payer not part of group" });
    }
    let calculate=[];
    if(splitType=== 'EQUAL'){
        const share=totalAmount/group.members.length;
        group.members.forEach(memberId=>{
            calculate.push({
                userId:memberId,
                amount:share
            });
        })
    }
    if(splitType === 'EXACT'){
        const sum=splits.reduce((acc ,s)=> acc+s.amount,0);
        if(sum !=totalAmount){
            return res.status(400).json({success: false,message: "Exact split amounts do not sum to total amount"
        });
        }
        calculate=splits;
    }
    if(splitType === 'PERCENTAGE'){
        const percentageSum = splits.reduce((acc, s) => acc + s.percentage,0);
      if (percentageSum !== 100) {
        return res.status(400).json({success: false,message: "Percentages must sum to 100"
        });
      }
      calculate = splits.map(s => ({
        userId: s.userId,
        amount: (totalAmount * s.percentage) / 100
    }));
    }
    for (let split of calculate) {
      if (split.userId.toString() !== paidBy.toString()) {
        const existingBalance = await Balance.findOne({fromUser: split.userId,toUser: paidBy,groupId});
        if (existingBalance) {
          existingBalance.amount += split.amount;
          await existingBalance.save();
        } else {
          await Balance.create({fromUser: split.userId,toUser: paidBy,amount: split.amount,groupId});
        }
      }
    }

    const expense=await Expense.create({groupId,totalAmount,paidBy,splitType,splits:calculate});
    return res.status(200).json({success:true, message:"Expenses Added Successfully", expense})
}catch(err){
    return res.status(500).json({success:false , message:err.message})
}
}