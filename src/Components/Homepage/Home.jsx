import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import { CategoryProduct, Search } from "../../pages";
import { calculateTotal } from "../../Slices/Cart/CartSlice";
import {useDispatch,useSelector } from "react-redux";
import {closeSideBar} from '../../Slices/Sidebar/Sidebar'
import { backHome } from "../../Slices/Homepage/homepageSlice";


const Home = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {cartItem}=useSelector((store)=>store.cart)
  const {isSearched}=useSelector((store)=>store.HomeProduct)
  const[load,setLoad]=useState(false)
  
  useEffect(()=>{
    dispatch(calculateTotal())
    dispatch(closeSideBar())
   
   
  },[cartItem])
  

 useEffect(()=>{
  
  if(!localStorage.getItem('AuthToken')){
    setLoad(true)
    setTimeout(() => {
      navigate('/')
    }, 2000)
    
  }
 },[localStorage.getItem('AuthToken')])



const handle=()=>{
  localStorage.removeItem('AuthToken')
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
   {<Modal/> }  
 <Navbar handle={handle}/>
 {isSearched?<Search/>:<CategoryProduct/>}
    </div>
    
  )
}
export default Home