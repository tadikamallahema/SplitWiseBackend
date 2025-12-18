import mongoose from "mongoose";

const splitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
      required: true
    },
    description: {
      type: String,
      trim: true},
    totalAmount: {
      type: Number,
      required: true
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    splitType: {
      type: String,
      enum: ["EQUAL", "EXACT", "PERCENTAGE"],
      required: true
    },
    splits: [splitSchema]
  },
  {timestamps: true}
);

const Expense = mongoose.model("expense", expenseSchema);

export default Expense;
