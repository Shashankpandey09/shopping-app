import { useEffect, useState } from 'react';
import img from '../../assets/pexels-mikhail-nilov-6613914.jpg';
import { useNavigate } from 'react-router-dom';

const Vedio = () => {
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
    let timeoutId;
    if(loading){
      timeoutId= setTimeout(() => {
        setLoading(false)
        navigate('/login');
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  },[loading])
  const handleClick=()=>{
    setLoading(true)
   

  }
  return (
   
    <div className='w-screen h-screen relative'>
      <div className='overlay w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 ' ></div>
    
      <div className='absolute flex flex-col  justify-center items-center w-full h-full'>
        <div className='mb-3 text-white text-center text-2xl'>
          <p>Ah, what a perfect day for shopping!</p>
        </div>
    
        {loading?<div className='h-24 w-24 border-t-2 border-b-2 border-white rounded-full animate-spin infinite'></div>: <button  onClick={handleClick}className="text-white text-2xl border  z-10 border-white hover:bg-white hover:text-black transition duration-300 py-2 px-4">
    Shop Now
  </button>}
     
      </div>
  
    <img className='object-cover w-full h-full' src={img} />
    </div>
   
  )
}
export default Vedio 