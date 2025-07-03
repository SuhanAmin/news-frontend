const express=require('express');
const router=express.Router();
const usermodel=require('../models/user')
const postmodel=require('../models/post')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieparser=require('cookie-parser')
const islogged=require('../middleware/middle')
//const multer=require('multer')
const  upload  = require('../utils/multer');


router.post('/like/:id',islogged,async(req,res)=>{

  //console.log(req.params.id);
  
 let post=await postmodel.findOneAndUpdate({_id:req.params.id},{$inc:{likes:1}},{new:true})
  //console.log(req.body);
  res.json(post.likes)
 //let post=await postmodel.findById(req.body.id)
  
})

router.post('/register',async(req,res)=>{
  try{
   
    
    const {name,email,mobile,password}=req.body
  const salt=await bcrypt.genSalt(10)
  const hashedpass=await bcrypt.hash(password,salt);

  let user1=await usermodel.findOne({email,mobile})

  if(user1){
    return res.json({msg:"ALready exists",done:false})
  }
  //console.log(user1);
  
  let user= await usermodel.create({
    name,
    email,
    mobile,
    password:hashedpass
  })
  // console.log(user);
  const token=jwt.sign({email},process.env.JWT_SECRET)
  res.cookie("token",token)
  res.json({msg:"Logged in Successfully",done:true})
  }
  catch(err){
    res.status(500).json({err:err.message})
  }
  
  
})

router.post('/login',async(req,res)=>{
  
  try{
    const {email,password}=req.body

 let user=await usermodel.findOne({email})
 if(!user){
  return res.json({msg:"Please Register",done:false})
 }
 let match =await bcrypt.compare(password,user.password)
if(match){
  const token=jwt.sign({email},process.env.JWT_SECRET)
  res.cookie("token",token)
  res.json({msg:"Logged in",done:true})
}
else{
  res.json({msg:"Wrong Details",done:false})
}
  }

 catch(err){
    res.status(500).json({err:err.message})
  }
 
 
  
})

router.delete('/deletepost/:id',islogged,async(req,res)=>{
 let post=await postmodel.findByIdAndDelete(req.params.id)
 res.json({msg:"Deleted"})
 
})

router.get('/profile',islogged,async(req,res)=>{
 // console.log("Hello");
  

  try{
   let email=req.user.email
   //console.log(email);
   
   let user=await usermodel.findOne({email}).populate("posts")
  //let post=await postmodel.find({user:user._id})
   //console.log(user);
   
   res.json(user)
  }
  catch(err){
    res.status(500).json({err:err.message})
  }
})


router.post('/saveprofile',islogged,async(req,res)=>{
let email=req.user.email  


let{name,phone}=req.body
try{
  let user=await usermodel.findOneAndUpdate({email},{name,mobile:phone})
  res.json({msg:"Profile Updated"})
}
catch(err){
  res.status(500).json({err:err.message})
}

})


//const apiKey = '5b9b6485ee464c5cbb5d36093ff0aee1';
router.get('/news', islogged, async (req, res) => {
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=india&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('News fetch failed:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.get('/home', islogged, async (req, res) => {
  try {
  let post=await postmodel.find().sort({createdAt:-1})


    res.json(post);
  } catch (error) {
  
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.post('/addlocalnews',islogged,upload.single('image'),async(req,res)=>{

  let {title,description,location,date,time}=req.body
  //console.log(req.file);
  
 let image=req.file.path
 //console.log(image,title,description,location,date,time);
 
  try{
    let post=await postmodel.create({title,description,location,date,time,image})
    let user=await usermodel.findOne({email:req.user.email})
    user.posts.push(post._id)
    await user.save()
    res.json({msg:"News Added",image:post.image,title:post.title,description:post.description,location:post.location,date:post.date,time:post.time})
  }
  catch(err){
    res.status(500).json({err:err.message})
  }
  
})



router.post('/logout',islogged,async(req,res)=>{
  res.clearCookie("token")
  res.json({msg:"Logged Out"})
})
module.exports=router
