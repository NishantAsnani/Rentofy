import React from "react";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { Carousel } from "flowbite-react";
import { useNavigate } from "react-router";
import Shoes from '../images/Shoes.jpeg'
import Tent from '../images/Tent.jpeg'
import Telescope from '../images/Telescope.jpeg'
import Belt from '../images/Belt.jpeg'
import logo from '../images/logo.jpeg'


const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-full h-16 bg-[#315EE7]">
      
      <label htmlFor="search"></label>
      <div className="h-16 flex items-center justify-center">
       
        <img src={logo} className='w-14 h-14 cursor-pointer -translate-x-96' onClick={()=>navigate('/Home')} alt="" />
      
        
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Items"
          className="rounded-3xl border-[0.5px] w-[500px] h-10 border-slate-100 bg-slate-100 outline-none font-Montserrat text-[20px] placeholder:translate-x-4 placeholder:focus:text-[#315EE7]"
          autoComplete="off"
        />

        <BsSearch className="inline-block relative right-8 text-xl cursor-pointer" />
        <FaShoppingCart className="text-white text-xl cursor-pointer hover:-translate-y-2 ease-in-out duration-200" />

        <button className=" cursor-pointer text-white font-semibold text-[17px] relative left-80">
          Nishant
        </button>

        <button className="cursor-pointer text-white font-semibold relative left-[350px]">
          <CgProfile className="text-2xl" />
        </button>
      </div>
      <div className="flex justify-around items-center bg-[#315EE7] w-[90%] mt-4 ml-16 h-14 rounded-lg">
        <span onClick={() => navigate("/Home")} className="text-white font-semibold text-lg cursor-pointer hover:-translate-y-1 ease-linear duration-200 hover:bg-white hover:text-[#315EE7] p-1 rounded-lg">Home</span>
        <span onClick={() => navigate("/Rent")} className="text-white font-semibold text-lg cursor-pointer hover:-translate-y-1 ease-linear duration-200 hover:bg-white hover:text-[#315EE7] p-1 rounded-lg">Rent/Want</span>
        <span onClick={() => navigate("/Donate")} className="text-white font-semibold text-lg cursor-pointer hover:-translate-y-1 ease-linear duration-200 hover:bg-white hover:text-[#315EE7] p-1 rounded-lg">Donate</span>
      </div>
      <h2 className="text-[#22215B] font-semibold text-[55px] flex justify-center">
        Recommendations
      </h2>
      <div className="h-52 sm:h-64 xl:h-80 2xl:h-96 dark mt-2 mr-4">
        <Carousel className='bg-[#315EE7] w-[99%] ml-2 h-[310px] rounded-2xl'>
          <img
            src={Shoes}
            alt="Shoes"
            className="h-[90%] w-full object-contain"
          />
          <img
            src={Belt}
            alt="Belt"
            className="h-[90%] w-full object-contain"
          />
          <img
            src={Tent}
            alt="Tent"
            className="h-[90%] w-full object-contain"
          />
          <img
            src={Telescope}
            alt="Telescope"
            className="h-[90%] w-full object-contain"
          />
        </Carousel>
        </div>
        <footer className="w-[100%] mt-[120px] flex justify-start items-center bg-gray-700 text-white opacity-95 relative top-3 bottom-0 h-[61px] rounded-md">
    <span className="text-xl pl-7">Copyright &#169; 2022 Rentofy All Rights reserved </span>
        </footer>
    </div>
  );
};

export default MainPage;
