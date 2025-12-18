import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name :{
        type:String ,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    phoneNumber: {
      type: String,
       match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    }
  },
  {
    timestamps: true
  }
);


const userModel=mongoose.models.user || mongoose.model('user',userSchema);
export default userModel ;