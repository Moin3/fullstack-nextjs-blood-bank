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
    role?:IRole 
  }

export interface IInputType{
    labelTxt:string,
    inputType:string,
    id:string,
    name:string,
    value:any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checked?:boolean,
}

export interface ILoginReq{
    role:string,
    email:string,
    password:string
}

interface Iuser{
    _id: string,
    role: string,
    name?: string;
    hospitalName?: string;
    organisationName: string,
    email: string,
    password: string,
    address: string,
    phone: string,
}

export interface AuthState {
loading:boolean,
user:Iuser | null,
token:string | null,
error:any | null,
message:string | null
isSuccess:boolean | null


}

export interface IForm{
    formTitle:string,
    btnTxt:string,
    formType:string,
    btnType:string
}

export interface IFormValues {
    role: string;
    email: string;
    password: string;
    name?: string;
    hospitalName?: string;
    organisationName?: string;
    website?: string;
    address?: string;
    phone?: string;
  }