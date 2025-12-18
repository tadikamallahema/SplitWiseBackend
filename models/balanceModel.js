import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema(
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

const Balance =
  mongoose.models.Balance || mongoose.model("balance", balanceSchema);

export default Balance;
