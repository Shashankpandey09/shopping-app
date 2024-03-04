import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeProducts } from "../../Slices/Homepage/homepageSlice";
import { AddItem, removeItem } from "../../Slices/Cart/CartSlice";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Caro from "../../Components/caros/Caro";
import LazyLoad from 'react-lazy-load';

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const { cartItem: { products } } = useSelector((store) => store.HomeProduct);
  const { itemId } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(homeProducts());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(AddItem(item));
    toast.success('Item added to cart', {
      position: 'top-right',
      autoClose: 1000,
      style: {
        marginTop: window.innerWidth <= 768 ? '20%' : '0%',
        position: 'absolute',
        left: '20%'
      },
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "dark",
      transition: Zoom,
    });
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item.id));
    toast.info('Item removed from cart', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      style: {
        marginTop: window.innerWidth <= 768 ? '20%' : '0%',
        position: 'absolute',
        left: '20%'
      },
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "dark",
      transition: Zoom,
    });
  };

  return (
    <div style={{ backgroundColor: 'rgb(247, 232, 229)' }} className=" text-white overflow-hidden md:overflow-auto">
      <div className="hidden md:block">
        <Caro />
      </div>
      <div className="bg-[rgb(221,177,114)] w-[40%] text-center md:w-[20%] rounded-lg ml-4 mb-10 p-4 mt-4">
        <p className="text-black text-xl font-bold">See Our Products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {products && products.map((item) => (
          <div
            key={item.id}
            className="max-w-md mx-auto w-[90vw] md:w-fit flex flex-col gap-2 text-gray-800 rounded-md overflow-hidden shadow-sm mb-6 transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full h-full">
              <LazyLoad height={150} width="auto" threshold={0.95}>
                <img
                  className="w-full h-full object-cover rounded-t-md"
                  src={item.images[0]}
                  alt={item.title}
                />
              </LazyLoad>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">Price: ${item.price}</p>
              <p className="text-gray-500">Rating: {item.rating}</p>
              <p className="text-gray-500">Stock: {item.stock}</p>
              <p className="text-green-500">Discount: {item.discountPercentage}% off</p>
            </div>
            <div className="flex justify-end items-center rounded-b-md p-4">
              {itemId.includes(item.id) ? (
                <button
                  className="bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 focus:outline-none"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="bg-black text-white px-4 py-3 rounded-md hover:bg-opacity-[0.8] focus:outline-none"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryProduct;
