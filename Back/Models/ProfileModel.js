import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    number:{type:Number,required:true , unique:true},
    interest:{type:String,required:true},
    longitude:{type:Number,required:true},
    latitude:{type:Number,required:true},

})

const profile = mongoose.model("profile",profileSchema)
export default profile