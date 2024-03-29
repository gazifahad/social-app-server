import express, { query } from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";


const router = express.Router();
export const getPost= async (req,res) =>{
    const {id}=req.params;
    console.log(req.params);
    
    try {
        // console.log(id);
        const post=await PostMessage.findById(id);
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({mesage: error.mesage})
    }
}
export const getPosts = async (req, res) => {
    const {page}=req.query;
    // console.log(page);
    try {
        const LIMIT=6; 
        // limit can be used dynamically
        const startIndex=(Number(page)-1 )* LIMIT;//getting the starting index of all the posts
        // converting page to Number because we get string as query

        const total=await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex); //skipping all the previous pages from loading
        
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPages:Math.ceil(total/LIMIT)});
    }
    catch (error) {
        res.status(404).json({ message: error.message });

    }
}
export const getPostsBySearch=async (req, res)=>{
    const {searchQuery , tags}=req.query; 
    // console.log(searchQuery);
    
    
    try {
        
       const title=new RegExp(searchQuery,"i");
       const posts=await PostMessage.find({$or: [ {title}, {tags:{$in:tags.split(',') }}]})

       res.json({data:posts})
    //    i for ignoring case 
    } catch (error) {
       res.status(404).json({message: error.message}) 
    }
}
export const createPost = async(req, res) => {
    
    const post=await req.body;
    // console.log(post);
    const newPost=PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
   try{
       await newPost.save();
       res.status(201).json(newPost)
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
 const updatedPost=await PostMessage.findByIdAndUpdate(_id, {...post,_id},{ new: true });
 res.json(updatedPost);
}

export const deletePost = async(req, res) => {
const {id }=req.params;

if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post related to this id')

await PostMessage.findByIdAndRemove(id);
res.json({message:'post deleted successully'})

}
export const likePost = async(req, res) => {
    const { id }=req.params;
    if(!req.userId) return res.json({message: 'unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post related to this id');
    const post=await PostMessage.findById(id);
    const index=post.likes.findIndex((id)=>id===String(req.userId));
    if(index===-1) {
        //like the post
   post.likes.push(req.userId);
    }
    else{
       post.likes=post.likes.filter((id)=>id!== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost);


}
export const commentPost =async(req,res)=>{
  const {id}=req.params;
  const {value}=req.body;
    const post=await PostMessage.findById(id);
    post.comments.push(value);

    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost)
}