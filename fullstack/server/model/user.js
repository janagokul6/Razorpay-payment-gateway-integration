import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema= new Schema({
  name:{
    type:String,
    require:true
  },
  number: {
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true
  }
},{
  timestamps: true
},{
  versionKey:false
})

const User= mongoose.model("User",userSchema);
export default User