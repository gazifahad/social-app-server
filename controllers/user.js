import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin=async (req,res)=>{
 const {email,password} =req.body;
//  console.log(req.body);
 try {
    const existingUser=await User.findOne({email});
   //  console.log(email);
    if(!existingUser) return res.status(404).json({message: 'user doesnot exist,please sign up!'});
    const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({message: 'invalid credentials!'});
    const token=jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET,{expiresIn:'1h'})
    res.status(200).json({result:existingUser,token})
 } catch (error) {
    res.status(500).json({message:'something went wrong!'})
 }
}
export const signup=async (req,res)=>{
   console.log(req.body);
   const {email,password,confirmPassword,firstName,lastName}=req.body;
   try {
      const existingUser=await User.findOne({email});
    if(existingUser) return res.status(400).json({message: 'user already exists!'});
    if(password!== confirmPassword) return res.status(400).json({message: 'passwords donot match!'});

    const hashedPassword=await bcrypt.hash(password,12);
    const result=await User.create({email,password:hashedPassword, name: `${firstName} ${lastName}`});
    const token=jwt.sign({email:result.email,id:result._id},process.env.SECRET,{expiresIn:'1h'})
    res.status(200).json({result,token})

   } catch (error) {
      res.status(500).json({message:'something went wrong!'})
      
   }

}