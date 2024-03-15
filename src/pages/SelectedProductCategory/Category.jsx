import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import Navbar from "../../Components/Navbar/Navbar";
import Modal from "../../Components/Modal/Modal";
import { openSideBar } from "../../Slices/Sidebar/Sidebar";

const Category = () => {
  const { categoryProduct: { products } } = useSelector((store) => store.categoryProduct);
  const dispatch = useDispatch();

  const openSideBars = () => {
    dispatch(openSideBar());
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Modal />
      <Navbar openSideBars={openSideBars} />
      <div className="container mx-auto px-4 pt-24">
        <p className="text-4xl font-semibold text-gray-800 mb-8">{products&&products[0]?.category}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => (
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
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-800">${item.price}</p>
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

export default Category;
