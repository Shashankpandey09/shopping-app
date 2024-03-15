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
    <div className="bg-gray-100 min-h-screen text-gray-800 py-12">
      <div className="hidden md:block">
        <Caro />
      </div>
      <div className="bg-yellow-500 w-[60%] md:w-[30%] rounded-lg ml-4 mb-10 p-4 mt-[50px] md:mt-4 text-center">
        <p className="text-black text-xl font-bold">See Our Products</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products && products.map((item) => (
            <Link key={item.id} to={`/SinglePage/${item.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 transform hover:scale-105">
                <div className="relative w-full h-52">
                  <LazyLoad height={200} threshold={0.95}>
                    <img
                      className="w-full h-full object-cover"
                      src={item.images[0]}
                      alt={item.title}
                    />
                  </LazyLoad>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">${item.price}</p>
                    <p className="text-sm text-gray-600">Rating: {item.rating}</p>
                  </div>
                  <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                  <p className="text-green-600">Discount: {item.discountPercentage}% off</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
