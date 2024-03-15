import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import Navbar from "../../Components/Navbar/Navbar";
const Category = () => {
  const {categoryProduct:{products}}=useSelector((store)=>store.categoryProduct)
  
  return (
   <div >
    <Navbar/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  pt-24  lg:grid-cols-4 xl:grid-cols-4 gap-6">
    {products && products.map((item) => (
      <Link key={item.id} to={`/SinglePage/${item.id}`}>
      <div
        key={item.id}
        className="max-w-md mx-auto  md:w-fit flex flex-col gap-2 text-gray-800 rounded-md overflow-hidden shadow-sm mb-6 transform transition-transform duration-300 hover:scale-105"
      >
        <div className="relative w-full h-full">
          <LazyLoad height={150} width="auto" threshold={0.95}>
            <img
              className="w-full h-full object-cover rounded-t-md"
              src={item.images[0]}
              alt={item.title}
            />
          </LazyLoad>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="mt-2 text-lg font-semibold text-gray-800">Price: ${item.price}</p>
          <p className="text-gray-500">Rating: {item.rating}</p>
          <p className="text-gray-500">Stock: {item.stock}</p>
          <p className="text-green-500">Discount: {item.discountPercentage}% off</p>
        </div>
   
      </div>
      </Link>
    ))}
  
  </div>
  </div>

  )
}
export default Category