import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    category: {
      type: String,
      enum: ["Electronics", "Clothing", "Food", "Books", "Other"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

export default Item;
