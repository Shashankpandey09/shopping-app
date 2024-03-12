import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { SearchProducts } from "../../Slices/Homepage/homepageSlice";
const Navbar = ({handle,openSideBars}) => {
  const [input,setInput]=useState('');
  const { cartItem } = useSelector((store) => store.cart);
 const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSubmit=(e)=>{
     e.preventDefault();
    dispatch(SearchProducts(input));
     navigate('/Search');
  }
  const totalItem=()=>{
    let total=0
   cartItem.forEach((basketItem)=>{
     total+= basketItem.amount
    })
    return total
  }
    return (
      <div className="flex justify-around shadow-lg items-center bg-black h-20 p-4 z-10 w-screen  fixed ">
        
        <div className="flex items-center cursor-pointer  text-black" >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white" onClick={openSideBars}>
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
          <Link to="/Home">
          <p className="md:text-2xl text-lg font-bold ml-2 mr-2  text-white  ">Shoppy</p></Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="search mr-4 bg-white flex justify-end  rounded-md w-[36vw] shadow-md  hover:shadow-red-700 transition-shadow duration-200 ">
            <form onSubmit={handleSubmit} className="flex items-center justify-between w-full ">
            <input type="text" placeholder="Search" required value={input} onChange={(e)=>setInput(e.target.value)} className="outline-none py-2 px-4 rounded-md text-black w-full" />
            <button type="submit">
              
            <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 24 24" className="mr-2 cursor-pointer z-10  hover:scale-105 text-gray-500" width="28" height="28" fill="currentColor">
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg>
          
            </button>
            </form>
            
          </div>
   
        
        </div>
        <div>
        <div className="shopping-svg text-white flex  gap-2  relative ">
            <Link to="/Cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(255,255,255,1)">
              <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
            </svg>
            <div className="cart-item w-4 h-4 absolute top-0   rounded-full text-xs bg-white text-black text-center">{totalItem()}</div>
            </Link>
            {/* <button className="text-white text-xl" onClick={handle}>logout</button> */}
          
          </div>
        </div>
        
      </div>
    );
  };
  
  export default Navbar;
  