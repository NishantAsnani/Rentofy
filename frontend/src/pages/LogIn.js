import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";


const LogIn = () => {
const [user,setUser]=useState(
  {
  email:"",
  password:""
  })


const navigate=useNavigate()

const handleOnchange=(e)=>{
  let name=e.target.name
  let value=e.target.value
  setUser({...user,[name]:value})
  }


const handleSubmit=async (e)=>{
e.preventDefault();
        
        const res= await fetch('http://localhost:3001/LogIn',
        {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept: "application/json"
        },
        body:JSON.stringify({
          email:user.email,
          password:user.password,
        })
        })
        console.log(res)
  if(res.status===500)
  {
    alert('Wrong email or password')
  }
  else if(res.status===404)
  {
    alert('Data not found')
  }
  else
  {
    navigate('/MainPage')
   }
  }


  return (
    <section>
      <div className="flex translate-y-20 translate-x-10 justify-center ">
        <h1 className="text-[50px] font-semibold text-[#22215B]">Sign In</h1>
      </div>

      <div className="flex justify-center h-[100vh] items-center ml-28">
        <div className="flex bg-white justify-center h-[300px] w-[25%] mb-40 shadow-3xl relative shadow-black shadow-sm">
          <form action="" method="post" className="mx-5 mt-5">
            <input
              required
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnchange}
              placeholder="Email address"
              className="border-2 border-gray-300 px-3 pb-3  w-80 "
              autoComplete="off"
            />

            <input
              required
              type="password"
              name="password"
              onChange={handleOnchange}
              value={user.password}
              onPaste={(e)=>{e.preventDefault()}}
              placeholder="Password"
              className="border-2 border-gray-300 px-3 pb-3 w-80 mt-3 "
              autoComplete="off"
            />

            <button
              className="text-[18px] font-bold text-white w-56 h-12 bg-[#315EE7] rounded-lg translate-y-[22px] translate-x-[50px] hover:bg-[#436ef0] hover:ease-in-out "
              type="submit" onClick={handleSubmit}
            >
              Log In
            </button>

            <a
              href="/SignUp"
              className="flex justify-center font-semibold text-[#315EE7] mt-14"
            >
              Create New Account
            </a>
          </form>
        </div>
      </div>
    </section>
  );
  }

export default LogIn;
