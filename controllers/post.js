import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

const router = express.Router();
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        
        res.status(200).json(postMessages);
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}
export const createPost = async(req, res) => {
    
    const post=await req.body;
    // console.log(post);
    const newPost=PostMessage(post);
   try{
       await newPost.save()
       res.status(200).json(newPost)
   }
   catch(error){
            res.status(409).json({ message: error.message });
   }
}
export const updatePost = async(req, res) => {
  const { id: _id }=req.params;
  const post=req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post related to this id')
//   update a data in dbase and update it in ui also new : true
 const updatedPost=await postMessage.findByIdAndUpdate(_id,post,{ new: true });
 res.json(updatedPost);
}