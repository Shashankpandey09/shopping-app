import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkValid } from "../../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { store } from "../../Slices/UserData/userData";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignUp, setSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        dispatch(store({ email, uid }));
        navigate("/Home");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleClick = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = checkValid(emailValue, passwordValue);
    setErrorMessage(message);

    if (!message) {
      setLoading(true);
      try {
        if (isSignUp) {
          const userCredential = await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
          console.log("User signed up successfully:", userCredential.user);
          dispatch(store(userCredential.user));
          navigate("/Home");
        } else {
          const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
          console.log("User signed in successfully:", userCredential.user);
          dispatch(store(userCredential.user));
          navigate("/Home");
        }
      } catch (error) {
        setErrorMessage(`${error.code} ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative bg-gray-800">
      <div className="absolute inset-0 overflow-hidden z-0"></div>
      <div className="h-screen flex justify-center items-center">
        {loading ? (
          <div className="loader border-4 border-t-white border-gray-800 h-16 w-16 rounded-full animate-spin"></div>
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-lg p-8 md:w-1/2 lg:w-3/12 w-3/4 bg-black bg-opacity-80 text-white flex flex-col justify-center items-center z-10"
          >
            {isSignUp ? (
              <h1 className="font-bold text-3xl py-4 self-start">Sign Up</h1>
            ) : (
              <h1 className="font-bold text-3xl py-4 self-start">Sign In</h1>
            )}
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-4 rounded-sm my-6 w-full bg-gray-700"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-4 rounded-sm mb-6 w-full bg-gray-700"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 rounded-sm mb-6 w-full bg-gray-700"
            />
            <p className="text-red-700 self-start text-md py-2 font-semibold">
              {errorMessage}
            </p>
            {!errorMessage && (
              <span className="text-sm text-gray-500 capitalize">
                Password must contain at least one numeral, special character, and should be capitalized (minimum length: 8)
              </span>
            )}
            <button
              onClick={handleClick}
              className="p-4 my-4 w-full bg-red-700 rounded-sm"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
            <p className="self-start pb-6">
              {isSignUp ? "Already Have An Account?" : "New to Shoppy?"}{" "}
              <span
                onClick={() => setSignUp(!isSignUp)}
                className="hover:text-gray-400 hover:underline cursor-pointer"
              >
                {isSignUp ? "Sign In Now" : "Sign Up"}
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
