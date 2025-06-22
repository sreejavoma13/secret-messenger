import mongoose from "mongoose"

const MessageSchema=new mongoose.Schema({
    message:{
        type:String,
        required:[true,'PleaseProvide the message']
    }
})

const Message=mongoose.model('Message',MessageSchema);
export default Message;

