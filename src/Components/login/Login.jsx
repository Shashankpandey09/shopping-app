
import { useState, useRef,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { checkValid } from "../../utils/validate";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../utils/firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [IsSignUp, setSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
   useEffect(()=>{
     if(auth.user!==null){
navigate("/Home");}
   },[])
  const handleClick = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = checkValid(emailValue, passwordValue);
    setErrorMessage(message);
  
    if (!message) {
      try {
        if (IsSignUp) {
          const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
          console.log("User signed up successfully:", userCredential.user);
          navigate("/Home")
    
        } else {
          const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
          navigate("/Home")
          console.log("User signed in successfully:", userCredential.user);
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(`${errorCode} ${errorMessage}`);
      }
    }
  };
  

  return (
    <div className="relative bg-gray-800">
  
      <div className="absolute inset-0 overflow-hidden z-0">
    
      </div>
      <div className="h-screen flex justify-center items-center">
        <form onSubmit={(e) => e.preventDefault()} className="rounded-lg p-8  md:w-1/2 lg:w-3/12  w-3/4 bg-black bg-opacity-80 text-white flex flex-col justify-center items-center z-10">
          {IsSignUp ? <h1 className="font-bold text-3xl py-4 self-start">Sign Up</h1> : <h1 className="font-bold text-3xl py-4 self-start">Sign In</h1>}
          {IsSignUp && <input type="text" placeholder="Full Name " className="p-4 rounded-sm my-6 w-full bg-gray-700" />}
          <input ref={email} type="text" placeholder="Email Address " className="p-4 rounded-sm mb-6 w-full bg-gray-700" />
          <input ref={password} type="password" placeholder="Password " className="p-4 rounded-sm mb-6 w-full bg-gray-700" />
          <p className="text-red-700 self-start text-md py-2 font-semibold">{errorMessage}</p>
           {!errorMessage&&<span className="text-sm text-gray-500 capitalize">Password must contain at least one numeral,special characters and should be capatilised (minimum length:8)</span>}
          <button onClick={handleClick} className="p-4 my-4 w-full bg-red-700 rounded-sm">{IsSignUp ? "Sign Up" : "Sign In"}</button>
          <p className="self-start pb-6">{IsSignUp ? "Already Have An Account?" : "New to Shoppy?"} <span onClick={() => setSignUp(!IsSignUp)} className="hover:text-gray-400 hover:underline cursor-pointer">{IsSignUp ? "Sign In Now" : "Sign Up"}</span></p>
        </form>
      </div>
    </div>
  );
};

export default Login;

