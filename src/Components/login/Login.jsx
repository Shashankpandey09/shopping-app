import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../Slices/Auth/Auth";
import { fetchData } from "../../Slices/Auth/Auth";
import { useNavigate } from "react-router-dom";
import video from '../../assets/vedio.mp4';



const Login = () => {
  const { isLoading ,reject} = useSelector((store) => store.auth);
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {    
    e.preventDefault();
    dispatch(LoginUser({ userName, password }));
    dispatch(fetchData());
  
  };
  useEffect(() => {
    
    
  if(localStorage.getItem('AuthToken')){
    
    navigate('/Home')
  
  }
  }, [localStorage.getItem('AuthToken')]);
  
 
  
  
  return (
    <>
       
        <div className="h-screen flex justify-center items-center w-screen  relative">
        <video className='object-cover w-full h-full' src={video} autoPlay preload="auto" loading="lazy" muted loop/>
          <form className="bg-white absolute rounded-lg p-8 flex flex-col shadow-lg w-[32rem] animate-fade-in" onSubmit={handleSubmit}>
            <h2 className="text-3xl mb-4 text-black">LOGIN</h2>

            <label htmlFor="user" className="text-gray-700 mb-2">
              UserName
            </label>
            <input
              required
              className="rounded-md text-black p-2 mb-4 border border-gray-400 focus:outline-none focus:ring focus:border-indigo-500"
              placeholder="kminchelle"
              type="text"
              name="user"
              value={userName}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="password" className="text-gray-700 mb-2">
              Password
            </label>
            <input
              required
              className="rounded-md text-black p-2 mb-4 border border-gray-400 focus:outline-none focus:ring focus:border-indigo-500"
              placeholder="0lelplR"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-md text-black p-2 transition duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring focus:border-indigo-700"

            >
            Login
            </button>
            {isLoading&&
          <h1 className="text-green-500 mt-2 ">Loading...</h1>}
          {reject&& <h1 className="text-red-500 mt-2">Invalid user Credentials</h1>}
          </form>
        
        </div>
      
    </>
  );
};

export default Login;
