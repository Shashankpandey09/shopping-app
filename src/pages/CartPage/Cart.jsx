import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeItem,increment ,decrease,calculateTotal} from "../../Slices/Cart/CartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItem = ({ product, onIncrement,handleRemove, deleteItem }) => {
   
  return (
    <div className="flex items-center pl-0 md:pl-10 w-[50vw] border-b border-gray-300 p-4">
      <img
        className="w-16 h-16 object-cover mr-4"
        src={product.images && product.images.length > 0 ? product.images[0] : null}
        alt={product.title}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 text-[8px] md:text-[12px]">{product.description}</p>
        <p className="text-gray-800">Price: ${product.price}</p>
      </div>
      <div>
      <button  onClick={()=>handleRemove(product)}
    
     className="text-white bg-black outline-none px-3 py-1 rounded-md ">-</button>
      <span className="mx-2">{product.amount}</span>
      <button onClick={()=>onIncrement(product)} className="text-white bg-black outline-none  rounded-md  px-3 py-1">+</button>
      </div>
       <div className="hover:text-red-500 cursor-pointer pl-2 ml-2" onClick={()=>deleteItem(product)}>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>
       </div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItem,amount } = useSelector((store) => store.cart);

  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(calculateTotal())
  },[cartItem])

  const handleIncrement = (item) => {
    
    dispatch(increment(item));
  };

  const handleRemove=(product)=>{
  
    if(product.amount<2){
      dispatch(removeItem(product.id))
  }
  dispatch(decrease((product)))}
  const deleteItem=(product)=>{
    dispatch(removeItem(product.id))
    toast.success('Item removed from cart', {
      position: 'top-right',
      autoClose: 1000,
      style: {
        marginTop: window.innerWidth <= 768 ? '20%' : '0%',
       
      
      },
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "colored",
      transition: Zoom,
    });
  }
  const calculateSubtotal = () => {
    
    return cartItem.reduce((total, product) => total + product.price*product.amount, 0);
   
  };
  

  return (
    <div className="mt-8 relative bg-gray-100 min-h-screen font-sans">
      <div className="mb-4">
        <h2 className="text-5xl md:text-7xl ml-10 font-bold uppercase text-gray-800">
          <abbr className="text-black no-underline" title="shopping cart">
            Your Cart
          </abbr>
        </h2>
        <p className="text-gray-600 ml-[4vw] mt-2 mb-4">
          {amount} {cartItem.length === 1 ? "item" : "items"} ships at checkout
        </p>
        {cartItem.length !== 0 && (
          <div className="bg-[rgb(250,243,233)] shadow-lg rounded-md fixed right-10 top-20 w-[30vw] md:w-[25vw] h-[40vh] p-6">
            <p className="font-semibold text-2xl mt-2 mb-4 text-gray-800">Summary</p>
            <p className="flex justify-between text-gray-800">
              Subtotal: <span>${calculateSubtotal().toFixed(2)}</span>
            </p>
            <div className="flex justify-between mb-4 text-gray-800">
              <p>Tax:</p>
              <span>$0.00</span>
            </div>
            <hr className="w-full border-[1px] border-gray-300 mb-4" />
            <div className="mt-4">
              <button className="bg-black text-white text-lg py-3 px-6 rounded-md w-full hover:bg-red-600">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      {cartItem.length !== 0 ? (
        <>
          {cartItem.map((product) => (
            <CartItem key={product.id} product={product} deleteItem={deleteItem} handleRemove={handleRemove} onIncrement={handleIncrement} />
          ))}
        </>
      ) : (
        <div className="flex items-center flex-col justify-center h-[50vh]">
          <p className="text-8xl uppercase font-thin mb-4 text-gray-800">Cart is empty</p>
          <button
            className="capitalize bg-red-500 py-4 px-6 rounded-full text-white hover:bg-red-600"
            onClick={() => navigate(-1)}
          >
            Continue Shopping
          </button>
        </div>
      )}
         <ToastContainer />
    </div>
  );
};

export default Cart;
