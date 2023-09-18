import mongoose, { Document} from "mongoose";
export interface IRole{
    role:string
}

export interface IuserSchema{
    role:string
    name?:string
    organisationName?:string
    hospitalName?:string
    email:string
    password:string
    website:string
    address:string
    phone:string
}


export interface IInventoryType{
    inventoryType:string
}

export interface IInventory extends Document {
    inventoryType: "in" | "out";
    bloodGroup: "O+" | "O-" | "AB+" | "AB-" | "A+" | "A-" | "B+" | "B-";
    quantity: number;
    email: string;
    organisation?: mongoose.Types.ObjectId; 
    hospital?: mongoose.Types.ObjectId;
    donar?: mongoose.Types.ObjectId; 
  }