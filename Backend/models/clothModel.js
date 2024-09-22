import mongoose from "mongoose";

const clothSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    date:{type:Number,required:true},
    bestseller:{type:Boolean},
})

const clothModel = mongoose.models.cloth || mongoose.model("cloth",clothSchema)

export default clothModel