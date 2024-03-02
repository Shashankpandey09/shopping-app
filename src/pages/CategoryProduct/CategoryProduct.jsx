import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeProducts } from "../../Slices/Homepage/homepageSlice";
import { AddItem, removeItem } from "../../Slices/Cart/CartSlice";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CategoryProduct = () => {
  const dispatch = useDispatch();
  const { cartItem: { products } } = useSelector((store) => store.HomeProduct);
  const { itemId } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(homeProducts());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(AddItem(item));
    toast.success('Item added to cart', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "dark",
      transition: Zoom,
    });
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeItem(item.id));
    toast.info('Item removed from cart', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "dark",
      transition: Zoom,
    });
  };

  return (
    <div >
       <Carousel 
        showArrows={true}
      
        infiniteLoop={true}
        interval={2000}
        autoPlay={true}
      
      >
        <div className="h-[82vh] w-screen">
          <img src="/products1.webp" className="object-cover w-full h-full rounded-md" alt="Product 1" />
        </div>
        <div className="h-[82vh] w-screen">
          <img src="/product2.webp" className="object-cover w-full h-full rounded-md" alt="Product 2" />
        </div>
        <div className="h-[82vh] w-screen">
          <img src="/nike.webp" className="object-cover w-full h-full rounded-md" alt="Product 3" />
        </div>
      </Carousel>
      <div className="bg-black w-[40%] text-center md:w-[20%] rounded-lg ml-4 p-4 mt-4">
        <p className="text-white text-xl font-bold">See Our Products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {products && products.map((item) => (
          <div
            key={item.id}
            className="max-w-md mx-auto flex flex-col gap-4 bg-transparent text-gray-800 rounded-md overflow-hidden shadow-sm border mb-6 transform transition-transform duration-300 hover:scale-105"
          >
            <img
              className="w-full h-36 object-cover"
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
            </div>
            <div className="flex justify-end absolute bottom-2 right-1">
              {itemId.includes(item.id) ? (
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryProduct;

