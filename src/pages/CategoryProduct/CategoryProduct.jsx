import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeProducts } from "../../Slices/Homepage/homepageSlice";

import 'react-toastify/dist/ReactToastify.css';
import Caro from "../../Components/caros/Caro";
import LazyLoad from 'react-lazy-load';
import { Link } from "react-router-dom";

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const { cartItem: { products } } = useSelector((store) => store.HomeProduct);


  useEffect(() => {
    dispatch(homeProducts());
  }, [dispatch]);
 

  
  return (
    <div  className=" text-white overflow-hidden md:overflow-auto">
      <div className="hidden md:block">
        <Caro />
      </div>
      <div className="bg-[rgb(221,177,114)] w-[40%] text-center md:w-[20%] rounded-lg ml-4 mb-10 p-4 mt-[150px]  md:mt-4">
        <p className="text-black text-xl font-bold">See Our Products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {products && products.map((item) => (
          <Link key={item.id} to={`/SinglePage/${item.id}`}>
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
       
          </div>
          </Link>
        ))}
      
      </div>
    
    
    </div>
  );
};

export default CategoryProduct;
