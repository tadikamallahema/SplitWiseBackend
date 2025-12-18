import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group"
    }
  },
  {
    timestamps: true
  }
);

const Settlement =mongoose.model("Settlement", settlementSchema);

export default Settlement;
