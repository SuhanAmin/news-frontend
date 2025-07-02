const mongoose=require('mongoose')
const user = require('./user')
mongoose.connect(process.env.MONGODB_URI)

const postSchema=mongoose.Schema({
    image:String,
    title:String,
    description:String,
    location:String,
    date:String,
    time:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    likes:{
        type:Number,
        default:0
    }
},{timestamps:true})
module.exports=mongoose.model("post",postSchema)