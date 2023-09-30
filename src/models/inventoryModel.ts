import mongoose from "mongoose";
import { IInventoryType } from "@/types/types";
import { IInventory } from "@/types/types";

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type require"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is require"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      require: [true, "blood quanity is require"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "organisation is required"],
    },
    role: {
      type: String,
      ref: "users",
      required: [true, "role is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function (this: IInventoryType) {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function (this: IInventoryType) {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.models.inventories || mongoose.model<IInventory>("inventories", inventorySchema);

export default Inventory;

// export default mongoose.model<IInventory>("Inventory", inventorySchema);
