import  express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import { MongoClient, ServerApiVersion } from 'mongodb';
// import dotenv from 'dotenv'
// require('dotenv').config()

const app=express();
app.use(cors());
app.use('/posts',postRoutes)

app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));

const PORT=process.env.PORT || 5000;

//setup mongodb
// user: social
// pw: KrmQ41GOjZh3MT0U


const uri = 'mongodb+srv://social:KrmQ41GOjZh3MT0U@cluster0.dbg5s.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`server running on: ${PORT}`)))
.catch((error)=>console.log(error.message));
// mongoose.set('useFindAndModify',false);
