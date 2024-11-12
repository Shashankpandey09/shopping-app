import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { openSideBar } from "../../Slices/Sidebar/Sidebar";
import Modal from "../../Components/Modal/Modal";
import { SearchProducts } from "../../Slices/Homepage/homepageSlice";
const Search = () => {
  const { search, status } = useSelector((store) => store.HomeProduct);
  const dispatch = useDispatch();
  const [itemSearched, setItemSearched] = useSearchParams();
  const query = itemSearched.get("query");

  useEffect(() => {
    dispatch(SearchProducts(query));
  }, [query]);

  const openSideBars = () => {
    dispatch(openSideBar());
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center bg-black min-h-screen">
        <div className="loader ease-linear border-4 border-t-4 border-t-red-500 h-24 w-24 animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Modal />
      <Navbar openSideBars={openSideBars} />

      <div className="container mx-auto pt-24 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {search?.products && search.products.length === 0 ? (
            <div className="text-red-500 text-center mt-24 col-span-full">
              <p>No products found with this entry</p>
            </div>
          ) : (
            search?.products?.map((item) => (
              <Link key={item.id} to={`/SinglePage/${item.id}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <p className="text-blue-500 font-bold">${item.price}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Rating: {item.rating}</p>
                      <p className="text-green-500">
                        Discount: {item.discountPercentage}% off
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
