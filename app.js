const express=require('express');
const app=express();
const cors=require('cors')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config()
const port=process.env.PORT || 3000;

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}
))

app.use(express.urlencoded({extended:true,limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))

app.use('/uploads',express.static('public/uploads'))

const authroutes=require('./routes/auth');


app.use('/api/auth',authroutes)

app.listen(port)