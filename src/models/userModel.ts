import mongoose from "mongoose";
import { IRole } from "@/types/types";
import { IuserSchema } from "@/types/types";


const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "donar", "hospital"],
    },
    name: {
      type: String,
      required: function (this:IRole) {
        if (this.role === "donar" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    organisationName: {
      type: String,
      required: function (this:IRole) {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      required: function (this:IRole) {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is requied"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone numbe is required"],
    },
  },
  { timestamps: true }
);

// export default mongoose.model<IuserSchema>("users", userSchema);

const User = mongoose.models.users || mongoose.model<IuserSchema>("users", userSchema);

export default User;
