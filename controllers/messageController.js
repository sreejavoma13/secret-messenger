
import {z} from 'zod'
import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Message from '../models/ProductModel.js'

dotenv.config();
connectDB()

const messageschema=z.object({
    message:z.string().min(3,{message:"Message must be atleast 3 character long"})
})

export const createMessage=async (req,res,next)=>{
    try{
        const parsed=messageschema.safeParse(req.body)
        const {message}=parsed.data
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors });
        }
        const newMessage=await Message.create({message})
        res.status(200).json({message:"message sent successfully"})
    }
    catch(error){
        next(error)
    }
}

export const getAllMessages=async (req,res,next)=>{
   try{
    const messages=await Message.find({})
    res.status(200).json({success:true,data:messages})
   }catch(error){
    next(error)
   }
}

export const getMessageById=async (req,res,next)=>{
    try{
        const message=await Message.findById(req.params.id);
        if(!message){
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        res.status(200).json({ success: true, data: message });
    }catch(error){
        next(error)
    }
}

export const deleteMessage = async (req, res, next) => {
  try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }
        res.status(200).json({ success: true, message: 'message deleted successfully' });
    } catch (error) {
        next(error)
    }
};