import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { memo } from 'react';
const Caro = () => {
  return (
    <Carousel 
    showArrows={true}
  infiniteLoop={true}
  interval={4000} // Increase the interval
  autoPlay={true}
  stopOnHover={false}
  transitionTime={1000}
    >
      <div className="h-[84vh] w-screen">
        <img src="/p1.jpg" className=" object-cover w-full h-full rounded-md"  loading="lazy"  alt="Product 1" />
      </div>
      <div className="h-[84vh] w-screen bg-slate-300">
        <img src="/p2.jpg" className="object-contain w-full h-full rounded-md"   loading="lazy"alt="Product 2" />
      </div>
      <div className="h-[84vh] w-screen  bg-red-700">
        <img src="/p3.jpg" className="w-full h-full object-contain rounded-md"  loading="lazy"  alt="Product 3" />
      </div>
      <div className="h-[84vh] w-screen  bg-white">
        <img src="/p4.jpg" className="w-full h-full object-contain rounded-md "  loading="lazy" alt="Product 3" />
      </div>
      <div className="h-[84vh] w-screen  bg-yellow-300">
        <img src="/p5.jpg" className="w-full h-full object-contain rounded-md  "  loading="lazy"  alt="Product 3" />
      </div>
    </Carousel>
  )
}
export default memo(Caro);