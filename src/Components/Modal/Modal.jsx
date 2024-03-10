import { closeSideBar, getProducts } from "../../Slices/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Modal = () => {
  const dispatch = useDispatch();
  const { SideOpen, products } = useSelector((store) => store.sidebar);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div
      className={`h-screen overflow-y-auto fixed opacity-0.9 bg-white wave-animation w-36 md:w-72 modal-scrollbar transition-all ease-in-out duration-300 z-20 ${
        SideOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 inline">
        <p className="  text-black font-bold mb-4 text-[0.7rem] uppercase md:text-lg inline">All Categories</p>
        <div
          className="svg cursor-pointer absolute text-black right-0 inline "
          onClick={() => dispatch(closeSideBar())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
          >
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
          </svg>
        </div>
        <div className="category mt-4">
          {products.map((category, index) => (
            <div
              key={index}
            
              className="mb-2 cursor-pointer text-black pl-4 text-sm md:text-lg uppercase border-b border-red-200"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="wave-animation bg-yellow-400"></div>
    </div>
  );
};

export default Modal;

