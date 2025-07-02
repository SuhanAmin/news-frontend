import React,{useState,useEffect, use} from 'react'
import {useNavigate} from 'react-router-dom'

import './home.css'

 function Profile() {
     const navigate=useNavigate()
     const[name,setname]=useState("")
     const[email,setemail]=useState("")
     const[phone,setphone]=useState("")
     const[news,setnews]=useState([])

      



     useEffect(()=>{
        hello()
     },[])
     async function hello(){
        const res=await fetch("https://news-2-zgo5.onrender.com/api/auth/profile",{
          method:"GET",
          credentials:"include"
        })
        if (res.status === 401) {
    alert("Please log in first!");
    navigate('/login');  // or wherever your login page is
    return;
  }
        const data=await res.json()
       // console.log(data);
        
        setname(data.name)
        setemail(data.email)
        setphone(data.mobile)

        //console.log(data.posts);
        

        setnews(data.posts||[])
        
        
     }
   
function toggleEdit(){
    document.getElementById("edit-form").style.display="block"
}

async function saveProfile(e){
      
    e.preventDefault()
    const res=await fetch("https://news-2-zgo5.onrender.com/api/auth/saveprofile",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
      
        
        body:JSON.stringify({name,email,phone})
    }).then(res=>res.json())
    .then(data=>{
        alert(data.msg)
        document.getElementById("edit-form").style.display="none"
    })


}

async function logout(){
    const res=await fetch("https://news-2-zgo5.onrender.com/api/auth/logout",{
        method:"POST",
        credentials:"include"
    }).then(res=>res.json())
    .then(data=>{
        alert(data.msg)
        navigate('/')
    })
    
}

 async function deletepost(id) {
  const res = await fetch(`https://news-2-zgo5.onrender.com/api/auth/deletepost/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const data = await res.json();
  alert(data.msg);
 hello();
  
 }




  return (
    <div className='hi'>
     <header>📱 Smart News Dashboard</header>

     <div id="profile-section" className="section1">
    <div className="profile-card">
      <h3>👤 User Profile</h3>
      <p><strong>Name:</strong> <span id="name">{name}</span></p>
      <p><strong>Email:</strong> <span id="email">{email}</span></p>
      <p><strong>Phone:</strong> <span id="phone">{phone}</span></p>
      <button onClick={toggleEdit}>Edit</button>
       <button style={{marginLeft:"80%",backgroundColor:"red"}} onClick={logout}>Logout</button>
      <div className="edit-form" id="edit-form">
        <form onSubmit={saveProfile}>
        <input id="edit-name" value={name}  onChange={(e)=>setname(e.target.value)} name='name' placeholder="Name" />
        <input id="edit-email" value={email} onChange={(e)=>setemail(e.target.value)} name='email' placeholder="Email" readOnly />
        <input id="edit-phone" value={phone} onChange={(e)=>setphone(e.target.value)}  name='mobile' placeholder="Phone" />
        <button >Save</button>
        </form>
      </div>
    </div>
    <h4>📚 Your Uploads</h4>
    <div id="user-uploads">
       <div className="container1">
       
      
    {news.map((upload, index) => {
     
        
          return(
          <div className='upload-card' key={index}>
         
            
    <img  src={upload.image} alt="upload" />
    <h2>{upload.title}</h2>
    <p>{upload.description}</p>
    <div className="upload-meta">
      <span>📍 {upload.location}</span>
      <span>📅 {upload.date}</span>
      <span>⏰ {upload.time}</span>
    </div>

    <div className="upload-actions" style={styles.actions}>
      <p >👍 {upload.likes}</p>
    
     <button  style={{backgroundColor:"red"}} onClick={()=>{deletepost(upload._id)}}> Delete</button>

    </div>

   
  </div>

      )
    
 
      
  
 })}




  

   </div>
    </div>
  </div>

 

    
  

  <footer>
  <button onClick={()=>{navigate("/home")}}>Local News</button>
  <button onClick={()=>{navigate("/news")}} >News</button>
  <button  className="active" >Profile</button>
</footer>
  </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: 16,
    width: 320,
    fontFamily: 'Arial, sans-serif',
    marginBottom: 20
  },
  meta: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'space-between'
  },
  actions: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  commentList: {
    marginTop: 10,
    borderTop: '1px solid #eee',
  },
  comment: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 8px'
  }
};
export default Profile
