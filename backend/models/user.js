import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
