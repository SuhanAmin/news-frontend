 import React from 'react'
 import { useState } from 'react'
 import {Link, useNavigate} from 'react-router-dom'
 import './login.css'
 
 function Login(){

const [isregister, setisregister] = useState(true)
const[email,setemail]=useState("")
const[name,setname]=useState("")
const[mobile,setmobile]=useState("")
const[password,setpassword]=useState("")
const[errmsg,setmsg]=useState("")

const navigate=useNavigate()


  
function toggleForms(){
    setisregister(!isregister)
}

async function handlelogin(e){
 //console.log(email,password);
 
 e.preventDefault()

  const res=await fetch("https://news-1-v7v7.onrender.com/api/auth/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({email,password}),
    credentials:"include"
  })
 
  .catch(err=>console.error(err))
const data= await res.json();
 if(data.done){
     alert(data.msg)
    navigate('/home')
  }
  else{
     setmsg(data.msg)
  }
  

  
}




    return (
    <div className="container">
      
  <form id="login-form" onSubmit={handlelogin}>
    <h2>Login</h2>
    <label >Email</label>
    <input type="email" id="login-email" onChange={(e)=>{setemail(e.target.value) ;setmsg("")}} placeholder="Enter your email" required />
    
    <label >Password</label>
    <input type="password" id="login-password" onChange={(e)=>{setpassword(e.target.value);setmsg("")}} placeholder="Enter your password" required />
    
    <button type="submit" >Login</button>
    <p style={{color:"red",textAlign:"center",marginTop:"10px"}}>{errmsg}</p>
   <Link to="/" className="toggle-link">Don't have an account? Register</Link>
  </form>
  
 
</div>
  )
}

 
 export default Login
 
 
 