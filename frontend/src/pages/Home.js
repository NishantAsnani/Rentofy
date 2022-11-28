import React from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Carousel } from "flowbite-react";
import Sandle from "../images/Sandle.jpeg";
import Bag from "../images/Bag.jpeg";
import Camera from "../images/Camera.jpeg";
import Speakers from "../images/Speakers.jpeg";
import Bag_Gucci from "../images/Bag_Gucci.webp";
import Laptop from "../images/Laptop.jpg";
import Furniture from "../images/Furniture.webp";
import SamrtWatch from "../images/SmartWatch.webp";
import ShoeCategory from "../images/ShoeCategory.jpg";
import Fashion from "../images/Fashion.jpg";
import logo from '../images/logo.jpeg'

const Home = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      
      <div className="max-w-full h-16 bg-[#315EE7]">
        <label htmlFor="search"></label>
        <div className="h-16 flex items-center justify-center">
        <img src={logo} className='w-14 h-14 cursor-pointer -translate-x-96' onClick={()=>navigate('/Home')} alt="" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Items"
            className="rounded-3xl border-[0.5px] w-2/6 h-10 border-slate-100 bg-slate-100 outline-none font-Montserrat text-[20px] placeholder:translate-x-4 placeholder:focus:text-[#315EE7]"
            autoComplete="off"
          />
          <BsSearch className="inline-block relative right-8 text-xl cursor-pointer" />

          <button
            onClick={() => navigate("/LogIn")}
            className="cursor-pointer flex justify-end text-white font-semibold text-[17px] relative left-80"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/SignUp")}
            className="cursor-pointer flex justify-end text-white font-semibold text-[17px] relative left-[370px]"
          >
            Sign Up
          </button>
        </div>
      </div>
      <h1 className="text-[#22215B] font-semibold text-[65px] flex justify-center">
        Categories
      </h1>
      <div className="bg-[#315EE7] max-w-full h-60  flex items-center">
        <div>
          <img
            src={Laptop}
            className="w-60 rounded-2xl ml-4 h-40 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
            alt=""
          />

          <div className="text-white text-2xl flex justify-center mt-4">
            Electronics
          </div>
        </div>

        <div>
          <img
            src={ShoeCategory}
            className="w-60 rounded-2xl ml-4 h-40 hover:cursor-pointer hover:scale-105 ease-in-out duration-300 hover:shadow-white"
            alt=""
          />

          <div className="text-white text-2xl flex justify-center mt-4">
            Shoes
          </div>
        </div>

        <div>
          <img
            src={SamrtWatch}
            className=" w-48 rounded-2xl h-40 ml-4 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
            alt=""
          />

          <div className="text-white text-2xl flex justify-center mt-4">
            Watches
          </div>
        </div>

        <div>
          <img
            src={Bag_Gucci}
            className="w-60 rounded-2xl h-40 ml-4 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
            alt=""
          />

          <div className="text-white text-2xl flex justify-center mt-4">
            Hand Bags
          </div>
        </div>

        <div>
          <img
            src={Furniture}
            className="w-60  rounded-2xl h-40 ml-4 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
            alt=""
          />

          <div className="text-white text-2xl flex justify-center mt-4">
            Furniture
          </div>
        </div>

        <div>
          <img
            src={Fashion}
            className="w-80 rounded-2xl  h-40 ml-4 hover:cursor-pointer hover:scale-105 ease-in-out duration-300"
            alt=""
          />

          <div className="text-white text-2xl flex justify-center mt-4">
            Clothings
          </div>
        </div>
      </div>
      <h2 className="text-[#22215B] font-semibold text-[55px] flex justify-center">
        Recommendations
      </h2>

      <div className="h-52 sm:h-64 xl:h-80 2xl:h-96 dark">
        <Carousel
          className="bg-[#315EE7] w-[99%] ml-2 h-[310px] rounded-2xl border-solid
        border-black"
        >
          <img
            src={Bag}
            alt="..."
            className="h-[90%] rounded-lg object-contain"
          />
          <img
            src={Sandle}
            alt="..."
            className="h-[90%] rounded-lg object-contain"
          />
          <img
            src={Camera}
            alt="..."
            className="h-[90%] rounded-lg object-contain"
          />
          <img
            src={Speakers}
            alt="..."
            className="h-[90%] rounded-lg object-contain"
          />
        </Carousel>
        <footer className="w-[100%] mt-[120px] flex justify-start items-center bg-gray-700 text-white opacity-95 relative top-3 bottom-0 h-[61px] rounded-md">
    <span className="text-xl pl-7">Copyright &#169; 2022 Rentofy All Rights reserved </span>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Home;
