import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../../Slices/Cart/CartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItem = ({ product, onRemove }) => {
  return (
    <>
    
    <div className="flex items-center border-b border-gray-300 p-4">
      <img
        className="w-16 h-16 object-cover mr-4"
        src={product.images[0]}
        alt={product.title}
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-gray-800">Price: ${product.price}</p>
      </div>
      <button
        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        onClick={() => onRemove(product.id)} // Use product.id instead of productId
      >
        Remove
      </button>
    </div>
    </>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const {cartItem}=useSelector((store)=>store.cart)
    // Parse the string to an array
    const navigate=useNavigate();
 
  const handleRemove = (productId) => {
    
    dispatch(removeItem(productId))
  
  };

  return (
    <div className="mt-8 ">
      <h2 className="text-2xl font-semibold mb-4 uppercase underline"><abbr className="text-black" title="shopping cart">Shopping Cart</abbr></h2>
      {cartItem.length!==0?cartItem.map((product) => (
        <CartItem key={product.id} product={product} onRemove={handleRemove} />
      )):<div className="  flex items-center flex-col justify-center h-[50vh] ">
        <p className="text-bg text-8xl font-thin mb-10">cart is empty</p>
        <button className=" capitalize bg-red-500 py-4 px-4 rounded" onClick={()=>navigate(-1)}>continue shopping</button></div>}
    </div>
  );
};

export default Cart;
