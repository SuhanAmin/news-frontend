 import React from 'react'
 import { useState } from 'react'
 import {useNavigate, Link} from 'react-router-dom'
 import './login.css'
 
 function Register(){


const[email,setemail]=useState("")
const[name,setname]=useState("")
const[mobile,setmobile]=useState("")
const[password,setpassword]=useState("")
const[errmsg,setmsg]=useState("")

const navigate=useNavigate()


  




async function handleregister(e){

  e.preventDefault()
//console.log(name,email,mobile);

  const res=await fetch("https://news-2-zgo5.onrender.com/api/auth/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({name,email,mobile,password}),
    credentials:"include"
  })
 
  .catch(err=>console.error(err))
const data= await res.json();
//console.log(data.done);
 
  if(data.done){
     alert(data.msg)
    navigate('/home')
  }
  else{
       setmsg(data.msg)
    navigate('/')
  
  }
 
  

}


    return (
    <div className="container">
       
       <form id="register-form" onSubmit={handleregister}>
    <h2>Register</h2>
    <label>Full Name</label>
    <input type="text" id="reg-name" onChange={(e)=>setname(e.target.value)} placeholder="Enter your full name" required />
    
    <label >Email</label>
    <input type="email" id="reg-email" onChange={(e)=>{setemail(e.target.value) ;setmsg("")}} placeholder="Enter your email" required />
    
    <label>Mobile</label>
    <input type="tel" id="reg-mobile" pattern='[0-9]{10}' onChange={(e)=>{setmobile(e.target.value) ;setmsg("")}} placeholder="Enter your mobile number" required />

    <label>Password</label>
    <input type="password" id="reg-password" onChange={(e)=>setpassword(e.target.value)} placeholder="Create a password" required />
    
   <p style={{color:"red",textAlign:"center"}}>{errmsg}</p>
    <button type="submit" >Register</button>
    <Link to="/login" className='toggle-link'>Already have an account? Login</Link>
  </form>
 

  
 
</div>
  )
}

 
 export default Register
 
 
 