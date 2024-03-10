import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { openSideBar } from "../../Slices/Sidebar/Sidebar";
import Modal from "../../Components/Modal/Modal";
const Search = () => {
  const { search ,status} = useSelector((store) => store.HomeProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handle=()=>{
    localStorage.removeItem('AuthToken')
    navigate('/')
    }
    const openSideBars=()=>{
      dispatch(openSideBar())
    }
    if(status=='loading'){
      return (
        <div className="flex items-center justify-center bg-black min-h-screen">
          <div className="loader ease-linear border-4 border-t-4 border-t-red-500 h-24 w-24 animate-spin rounded-full"></div>
        </div>
      )
    }

  return (
    <div className="bg-peach text-black container mx-auto overflow-hidden" >
        <Modal/>
        <div className="mb-24 "> <Navbar handle={handle} openSideBars={openSideBars}/></div>
      
      {search.products == false ? (
        <div className="text-red-500 text-center mt-[40vh] w-screen">
          <p>NO products found with this entry</p>
        </div>
      ) : (
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {search.products &&
            search.products.map((item) => (
              <Link   key={item.id} to={`/SinglePage/${item.id} `}>
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:scale-105 transition-all ease-in-out" 
              >
                <img
                  src={item?.images?.[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700 mb-2">{item.description}</p>
                  <p className="text-blue-500 font-bold">${item.price}</p>
        
                </div>
              </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
