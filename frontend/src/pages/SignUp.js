import React from "react";

import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => 
{
  
  const [user,setUser]=useState({
    Firstname:'',
    Surname:'',
    email:'',
    Contact:'',
    password:'',
    Day:1,
    Month:'Jan',
    Year:2022
    })
     
    const handleOnchange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    setUser({...user,[name]:value})
    }
    
    const handleSubmit=(e)=>
    {
        e.preventDefault()
        const res=fetch('http://localhost:3001/SignUp',
        {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          Firstname:user.Firstname,
          Surname:user.Surname,
          email:user.email,
          Contact:user.Contact,
          password:user.password,
          Day:user.Day,
          Month:user.Month,
          Year:user.Year
        })
          
        })
  if(res)
  {
    toast.success('User Added Sucessfully');
    setUser({Firstname:'',
    Surname:'',
    email:'',
    Contact:'',
    password:'',
    Day:1,
    Month:'Jan',
    Year:2022
  })
  }
     else
     {
      alert('Please fill data')
     }
  }
    
  return (
<section>
  <div className="flex translate-y-14 translate-x-10 justify-center ">
    <h1 className='text-[50px] font-semibold text-[#22215B]'>Sign Up</h1>
  </div>
      <div className="flex justify-center ml-24 translate-y-20 ">
        <img src="images/logo.png" alt="" className="" />
    </div>

        <div className="flex justify-center h-[100vh] items-center  ml-28">
            <div className="flex mt-20 justify-center rounded-xl bg-slate-100 h-[565px] w-4/12 shadow-sm shadow-black">
                <form action="" onSubmit={handleSubmit}  method="post" className="mx-5 mt-5">
                    <div className="font-bold text-[25px] flex justify-center mb-2 -translate-y-4">
                        Create a new account
                    </div>
                    
                    <div className="text-[#606770] text-[15px] flex justify-center -translate-y-4">
                        It's quick and easy
                    </div>

                    <input type="text" name="Firstname"  placeholder="Firstname" value={user.Firstname} onChange={handleOnchange} className="flex justify-center border-[1px] rounded-md border-gray-300 px-3 pb-3 translate-y-1 w-48 ml-8" required autoComplete="off" />

                    <input type="text" name="Surname"  placeholder="Surname" value={user.Surname} onChange={handleOnchange} className="flex justify-center border-[1px] rounded-md border-gray-300 px-3 pb-3 w-48 ml-8 -translate-y-10 translate-x-52" required autoComplete="off" />
    
                    <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleOnchange} className="flex justify-center border-[1px] rounded-md border-gray-300 px-3 pb-3 -translate-y-5 mb-6 w-[350px] ml-40 -translate-x-32" required autoComplete="off"  />

                    <input type="tel" name="Contact"  placeholder="Mobile No." value={user.Contact} onChange={handleOnchange} className="flex justify-center border-[1px] rounded-md border-gray-300 px-3 pb-3 -translate-y-5 mb-6 w-[350px] ml-40 -translate-x-32" required autoComplete="off"  />

                    <input type="password" name="password" onPaste={(e)=>{e.preventDefault()}} placeholder="Password" value={user.password} onChange={handleOnchange} className="flex justify-center border-[1px] rounded-md border-gray-300 px-3 pb-3 -translate-y-7 mb-3 w-[350px] ml-40 -translate-x-32" required autoComplete="off" />
    
                    <div className="text-[#606770] text-[12px] ml-8 mb-2 -translate-y-4"> 
                        Date of birth
                    </div>

                    <select name="Day" value={user.Day} onChange={handleOnchange} className="w-32 px-2 py-2 rounded-md border-[1px] border-gray-300 ml-8 -translate-y-4" required autoComplete="off">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>
<option value="14">14</option>
<option value="15">15</option>
<option value="16">16</option>
<option value="17">17</option>
<option value="18">18</option>
<option value="19">19</option>
<option value="20">20</option>
<option value="21">21</option>
<option value="22">22</option>
<option value="23">23</option>
<option value="24">24</option>
<option value="25">25</option>
<option value="26">26</option>
<option value="27">27</option>
<option value="28">28</option>
<option value="29">29</option>
<option value="30">30</option>
<option value="31">31</option>
                    </select>
      
                    <select name="Month" value={user.Month} onChange={handleOnchange} className="w-32 px-2 py-2 rounded-md border-[1px] border-gray-300 ml-6 -translate-x-2 -translate-y-4" required autoComplete="off">
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="may">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul">Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                    </select>

                    <select name="Year" value={user.Year} onChange={handleOnchange} className="w-32 px-2 py-2 rounded-md border-[1px] border-gray-300 translate-x-2 -translate-y-4 " required autoComplete="off">

                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    </select>

                  <button type="submit"  className="text-[18px] font-bold text-white w-56 h-12 bg-[#315EE7] rounded-lg translate-y-[10px] translate-x-[145px] hover:bg-[#436ef0] hover:ease-in-out ">Create New Account</button>
                  <Toaster/>
                    <a href="/LogIn" className="flex text-[17px] justify-center text-[#315EE7] mt-9 ml-64 font-semibold -translate-x-32">Already have an account?</a>
    
                    
                </form>

                
       
            </div>    
        </div>
</section>
  );
};

export default SignUp;
