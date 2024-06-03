import { closeSideBar, getProducts } from "../../Slices/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { SideOpen, products } = useSelector((store) => store.sidebar);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div
      className={`h-screen overflow-y-auto fixed opacity-90 bg-white wave-animation w-full md:w-72 modal-scrollbar transition-all ease-in-out duration-300 z-40 ${
        SideOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <p className="text-black font-bold mb-4 text-sm md:text-lg uppercase">All Categories</p>
        <div
          className="cursor-pointer absolute text-black right-4 top-4"
          onClick={() => dispatch(closeSideBar())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <div className="category mt-4">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((category, index) => (
              <div
                key={index}
                onClick={() => {
                  dispatch(closeSideBar());
                  navigate(`/Product/category/${category.slug}`);
                }}
                className="mb-2 cursor-pointer text-black pl-4 text-sm md:text-lg uppercase border-b border-gray-200 hover:text-red-500 transition-colors duration-300"
              >
                {category.slug}
              </div>
            ))
          ) : (
            <p className="text-black">No categories available.</p>
          )}
        </div>
      </div>
      <div className="wave-animation bg-yellow-400"></div>
    </div>
  );
};

export default Modal;
