import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeProducts } from "../../Slices/Homepage/homepageSlice";
import { AddItem ,removeItem} from "../../Slices/Cart/CartSlice";

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const { cartItem: { products } } = useSelector((store) => store.HomeProduct);
  const {itemId}=useSelector((store)=>store.cart)

  useEffect(() => {
    dispatch(homeProducts());
  }, []);

  

  const Add = (item) => {
    dispatch(AddItem(item))
  };

  return (
    <>
      <div className="bg-black w-[40%] text-center md:w-[20%] rounded-lg ml-4 my-2 p-4">
        <p className="text-white text-xl font-bold">See Our Products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {products && products.map((item) => (
          <div
            key={item.id}
            className="max-w-md mx-auto bg-white text-gray-800 rounded-md overflow-hidden shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105"
          >
            <img
              className="w-full h-32 object-cover"
              src={item.images[0]}
              alt={item.title}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">Price: ${item.price}</p>
              <p className="text-gray-800">Rating: {item.rating}</p>
              <p className="text-gray-800">Stock: {item.stock}</p>
              <p className="text-green-600">Discount: {item.discountPercentage}% off</p>
              <div className="flex justify-end absolute bottom-2 right-1">
                {itemId.includes(item.id)?<button
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                 onClick={()=>dispatch(removeItem(item.id))}
                >
                 Remove 
                </button>:<button
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                  onClick={() => Add(item)}
                >
                  Add to Cart
                </button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryProduct;
