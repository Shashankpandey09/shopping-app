import React from "react";
import { useDispatch } from "react-redux";
import { removeItem,increment } from "../../Slices/Cart/CartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const CartItem = ({ product, onIncrement }) => {
  const {amount}=useSelector((store)=>store.cart)
 
  return (
    <div className="flex items-center pl-0 md:pl-10 w-[50vw] border-b border-gray-300 p-4">
      <img
        className="w-16 h-16 object-cover mr-4"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 text-[8px] md:text-[12px]">{product.description}</p>
        <p className="text-gray-800">Price: ${product.price}</p>
      </div>
      <div>
      <button className="text-white bg-black outline-none px-3 py-1 rounded-md ">-</button>
      <span className="mx-2">{amount}</span>
      <button onClick={onIncrement} className="text-white bg-black outline-none  rounded-md  px-3 py-1">+</button>
      </div>
   
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((store) => store.cart);

  const navigate = useNavigate();

  const handleIncrement = (productId) => {
    dispatch(increment());
  };

  const calculateSubtotal = () => {
    return cartItem.reduce((total, product) => total + product.price, 0);
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
          {cartItem.length} {cartItem.length === 1 ? "item" : "items"} ships at checkout
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
            <CartItem key={product.id} product={product} onIncrement={handleIncrement} />
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
    </div>
  );
};

export default Cart;
