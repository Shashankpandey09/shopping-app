import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Slices/UserData/userData";

const Dropdown = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
const handleSignout=()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
dispatch(logout());
navigate('/login');
      }).catch((error) => {
        // An error happened.
console.log(error);
      });
}
  return (
    <div className="flex flex-col items-center gap-4 h-40 w-64 bg-gray-900 text-white p-4 shadow-lg rounded-md">
      <h2 className="text-md font-semibold">{auth.currentUser?.providerData[0].email}</h2>
      <hr className="w-full border-1 border-gray-600 my-2" />
      <button onClick={handleSignout} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
