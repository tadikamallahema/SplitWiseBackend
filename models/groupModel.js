import mongoose from "mongoose";

const groupSchema= new mongoose.Schema({
    groupName:{
        type:String,
        unique:true,
        required:true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const groupModel=mongoose.model('group',groupSchema);
export default groupModel;