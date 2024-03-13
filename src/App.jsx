import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Homepage/Home';
import './App.css';
import Login from './Components/login/Login';
import Vedio from './Components/VedioPage/Vedio';
import { CategoryProduct, Cart, Search, ProductSingle } from '../src/pages/index';
import Category from './pages/SelectedProductCategory/Category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Vedio />} />
        {/* Uncomment the line below if you want to include the login route */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Search" element={<Search />} />
        <Route path='/Product/category/:query' element={<Category/>}/>
        <Route path="/SinglePage/:userId" element={<ProductSingle />} />
      </Routes>
    </Router>
  );
}

export default App;
