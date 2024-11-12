import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeProducts } from "../../Slices/Homepage/homepageSlice";
import "react-toastify/dist/ReactToastify.css";
import Caro from "../../Components/caros/Caro";
import { Link } from "react-router-dom";



const CategoryProduct = () => {
  const dispatch = useDispatch();
  const {
    cartItem: { products },status
  } = useSelector((store) => store.HomeProduct);

  useEffect(() => {
   const id= setTimeout(() => {
      dispatch(homeProducts());
    }, 1000);
   return ()=>clearTimeout(id);
  }, [dispatch]);

  return (
    <div className="min-h-screen text-gray-800 py-12">
      <div className="hidden md:block">
        <Caro />
      </div>
     
      <div className="bg-white bg-opacity-70 w-[60%] md:w-[30%] rounded-lg ml-4 mb-10 p-4 mt-[50px] md:mt-4 text-center shadow-md">
        <p className="text-black text-3xl font-bold">Discover Our Collection</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products &&
            products.map((item) => (
              <Link
                key={item.id}
                to={`/SinglePage/${item.id}`}
                className="flex"
              >
                <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm shadow-black hover:shadow-xl transition duration-300 w-full">
                  <div className="relative h-64 overflow-hidden">
                  
                      <img
                        className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                        src={item.images[0]}
                        alt={item.title}
                        loading="lazy"
                      />
                 
                  </div>
                  <div className="flex-1 p-4">
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold">${item.price}</p>
                      <p className="text-sm text-gray-600">
                        Rating: {item.rating}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                    <p className="text-green-600">
                      Discount: {item.discountPercentage}% off
                    </p>
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
