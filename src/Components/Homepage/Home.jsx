import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import { CategoryProduct} from "../../pages";
import { calculateTotal } from "../../Slices/Cart/CartSlice";
import {useDispatch,useSelector } from "react-redux";
import {closeSideBar} from '../../Slices/Sidebar/Sidebar'
import { homeProducts } from "../../Slices/Homepage/homepageSlice";
import { openSideBar } from "../../Slices/Sidebar/Sidebar";


const Home = () => {

  const dispatch=useDispatch();
  const {cartItem}=useSelector((store)=>store.cart);
  const[load,setLoad]=useState(false)
  
  useEffect(()=>{
    dispatch(calculateTotal())
    dispatch(closeSideBar())
    dispatch(homeProducts())
   
  },[cartItem])
  

// //  useEffect(()=>{
  
// //   if(!localStorage.getItem('AuthToken')){
// //     setLoad(true)
// //     setTimeout(() => {
// //       // navigate('/')
// //     }, 2000)
    
// //   }
//  },[localStorage.getItem('AuthToken')])

const openSideBars=()=>{
  dispatch(openSideBar())
}

const handle=()=>{
  
  setLoad(true);
  }

 if(load){
  return (
<div className="flex justify-center items-center h-screen">
  <div className="text-5xl animate-spin h-24 w-24 border-t-4 border-red-500 rounded-full"></div>
</div>



  );
 }

  return (
    <div className='h-12 md:h-20 w-full text-white'>
   <Modal/>  
 <Navbar handle={handle} openSideBars={openSideBars}/>
 <CategoryProduct/>
    </div>
    
  )
}
export default Home