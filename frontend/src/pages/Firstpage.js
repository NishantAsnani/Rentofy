import React from 'react'
import { useNavigate } from "react-router-dom";
import Plants from '../images/Plants.webp'
import Planet from '../images/Planet.webp'
import Reliable from '../images/Reliable.webp'
import Contribution from '../images/Contribution.webp'



const Firstpage = () => {
 const navigate=useNavigate()
  
  
    return (
    <React.Fragment>
        
    <div className="bg-[#567DF4]  font-bold text-white rounded-lg h-32 max-w-full text-[20px] relative right-[90%] animate-slideLeft">
    
        <div className='flex justify-end mb-3 mt-4'>
        <p className='-translate-x-6 font-Exo 2 max-w-[80%] inline-block pl-2 pt-4'>
        	The vision of Rentofy is to create a sustainable society and minimize the production waste as well as maintenance cost of a plethora of objects that aren’t of daily use but are still an integral part of a lot of tasks. </p>
            <img src={Planet}className='rounded-lg border-2 border-black w-36 h-32 inline-block' alt="Planet"/>
        </div>
    </div>



    <div className="mt-6 rounded-lg bg-[#567DF4]  font-bold text-white animation-delay-1000  h-32 max-w-full text-[20px] relative left-[90%] animate-slideRight">
    <div className='flex justify-end '>
            <img src={Plants} className='rounded-lg ml-2 w-36 h-32 inline-block border-2 border-black -translate-x-20' alt="Planet"/>
            <p className="max-w-[86%] font-Exo 2 inline-block pl-2 pt-4 -translate-x-20">
            	Renting objects, while accomplishing the objective cheaply, also reduces the carbon footprint we leave on the planet. Just as we switch from cars to bikes to reduce fuel consumption, switching from buying to renting makes a significant difference in our environment.
        </p>
        </div>
    </div>


    <div className="bg-[#567DF4] font-bold text-white  rounded-lg animation-delay-2000  mt-6 h-32 max-w-full text-[20px] relative right-[90%] animate-slideLeft">
    
        <div className='flex justify-end mb-3 '>
        <p className='-translate-x-6 font-Exo 2 max-w-[80%] inline-block pl-2 pt-4'>
        	As far as reliability goes, we provide you absolute guarantee, while renting AND while putting things out to rent. Safety and security are what we strive for and we are completely committed to it.
           </p>
            <img src={Reliable}className='rounded-lg border-2 border-black w-36 h-32 inline-block ' alt="Planet"/>
        </div>
    </div>



    <div className="mt-6 rounded-lg font-bold text-white  bg-[#567DF4] animation-delay-3000  h-32 max-w-full text-[20px] relative left-[90%] animate-slideRight">
    <div className='flex justify-end '>
            <img src={Contribution} className='rounded-lg ml-2 w-36 h-32 inline-block border-2 border-black -translate-x-20' alt="Planet"/>
            <p className="max-w-[86%] font-Exo 2 inline-block pl-2 pt-4 -translate-x-20">
            	Along with indirectly being philanthropic, Rentofy also provides the facility to directly donate to your preferred causes, and availing offers, further helping society!
        </p>
        </div>
    </div>


    <div className='flex justify-center mt-20'>

<button className="bg-[#567DF4] rounded-lg font-semibold font-Exo 2 text-xl text-white w-40 h-16 
animate-bounce " onClick={()=>navigate('/Home')}>Get Started</button>
    </div>
    </React.Fragment>
  )
}

export default Firstpage