// Search.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddSearch } from "../../Slices/Cart/CartSlice";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { search } = useSelector((store) => store.HomeProduct);
  const [product, setProduct] = useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    if (product.length > 0) {
      dispatch(AddSearch(product));
    }
  }, [product]);

  const Add = (item) => {
    setProduct((prevProducts) => [...prevProducts, item])
  
  }
  return (
    <><div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold inline mx-4 text-black mb-4">Search Results:</h2>
        <button className="text-bg py-3 px-3 rounded-md bg-green-400" onClick={()=>navigate(-1)}>HomePage</button>
        {search.products == false ? (
          <div className="text-red-500 text-center w-screen">
            <p>NO products found with this entry</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {search.products &&
              search.products.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img src={item?.images?.[0]} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <p className="text-blue-500 font-bold">${item.price}</p>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
                      onClick={() => Add(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
