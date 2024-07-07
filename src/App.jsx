import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Lazy load components
const Home = lazy(() => import('./Components/Homepage/Home'));
const Login = lazy(() => import('./Components/login/Login'));
const Vedio = lazy(() => import('./Components/VedioPage/Vedio'));
const Cart = lazy(() => import('./pages/CartPage/Cart')); // Corrected import path
const Search = lazy(() => import('./pages/SearchPage/Search')); // Corrected import path
const ProductSingle = lazy(() => import('./pages/ProductSinglePage/ProductSingle')); // Corrected import path
const Category = lazy(() => import('./pages/SelectedProductCategory/Category'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" exact element={<Vedio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Search" element={<Search />} />
          <Route path='/Product/category/:query' element={<Category />} />
          <Route path="/SinglePage/:userId" element={<ProductSingle />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
