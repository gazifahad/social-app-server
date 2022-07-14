import  express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import { MongoClient, ServerApiVersion } from 'mongodb';

// require('dotenv').config()

const app=express();
dotenv.config();




app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/posts',postRoutes)




//setup mongodb
// user: social
// pw: KrmQ41GOjZh3MT0U


const uri = process.env.CONNECTION_URL;
const PORT=process.env.PORT || 5000;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`server running on: ${PORT}`)))
.catch((error)=>console.log(error.message));
// mongoose.set('useFindAndModify',false);
// mongoose.set('useFindAndModify', false);
