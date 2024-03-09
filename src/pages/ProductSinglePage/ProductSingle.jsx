import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../Slices/Singlepages/Singlepage";
import { AddItem, removeItem } from "../../Slices/Cart/CartSlice";
import { toast, ToastContainer, Zoom } from 'react-toastify';

const ProductSingle = () => {
  const { userId } = useParams();
  const { product } = useSelector((store) => store.page);
  const { itemId } = useSelector((store) => store.cart); // Change itemId to items

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(userId));
  }, [dispatch, userId]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const handleAddToCart = () => {
    dispatch(AddItem(product));
    toast.success('Item added to cart', {
      position: 'top-right',
      autoClose: 1000,
      style: {
        marginTop: window.innerWidth <= 768 ? '0%' : '0%',
      },
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

  const handleRemoveFromCart = () => {
    dispatch(removeItem(product.id));
    toast.info('Item removed from cart', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      style: {
        marginTop: window.innerWidth <= 768 ? '00%' : '0%',
      },
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

  const handleImageClick = (index, image) => {
    setSelectedImage(index);
    setLightboxVisible(true);
  };

  const handleCloseLightbox = () => {
    setLightboxVisible(false);
  };

  if (!product || !product.images) {
    return null; // or some loading/error component
  }



  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen text-black font-thin font-caveat">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative h-[60vh]">
          <div
            className="absolute top-0 left-0 w-full h-full bg-opacity-75 rounded-lg"
            onClick={() => handleImageClick(selectedImage, image)}
          ></div>
          <img
            src={image || product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl md:text-4xl mb-2">{product.title}</h2>
          <p className="text-lg md:text-xl mb-4">{product.description}</p>
          <div className="flex flex-col mb-4">
            <p className="text-xl md:text-2xl mb-2">Brand: {product.brand}</p>
            <p className="text-xl md:text-2xl mb-2">Category: {product.category}</p>
            <p className="text-xl md:text-2xl mb-2">${product.price}</p>
            <p className="text-xl md:text-2xl mb-2">Rating: {product.rating}</p>
            <p className="text-xl md:text-2xl mb-2">Discount: {product.discountPercentage}%</p>
            <p className="text-xl md:text-2xl">Stock: {product.stock} units available</p>
            <div className="flex justify-end items-center rounded-b-md p-4">
              {itemId.includes(product.id) ? (
                <button
                  className="bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 focus:outline-none"
                  onClick={handleRemoveFromCart}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="bg-black text-white px-4 py-3 rounded-md hover:bg-opacity-[0.8] focus:outline-none"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-4 md:mt-8">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product ${index + 1}`}
            className={`w-12 h-12 md:w-16 md:h-16 object-cover cursor-pointer rounded-lg ${
              selectedImage === index ? 'border-4 border-blue-500' : 'border-2 border-gray-300'
            } mr-2 md:mr-4`}
            onClick={() => setImage(img)}
          />
        ))}
      </div>

      {lightboxVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <span
              className="absolute top-4 right-4 text-red-500 text-4xl cursor-pointer"
              onClick={handleCloseLightbox}
            >
              &times;
            </span>
            <img
              src={image}
              alt="Lightbox"
              className="max-w-full max-h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductSingle;
