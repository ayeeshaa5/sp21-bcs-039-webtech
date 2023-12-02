import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema(

    {
        firstName:{
            type:String,
            required:[true,"First name is required"],
        },
        lastName:{
            type:String,
            required:[true,"Last name is required"],
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true,
        },
        password:{
            type:String,
            required:[true,"Password is required"],
        },
        location:{type:String},
        profileUrl:{type:String},
        profession:{type:String},
        friends:[{type:Schema.Types.ObjectId,ref:"User"}],
        views:[{type:String}],
        verified:{type:Boolean,default:false},
        },
        {timestamps:true}

);
const Users = mongoose.model("User",userSchema);
export default Users;