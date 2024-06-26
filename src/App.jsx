import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Homepage/Home';
import './App.css';
import Login from './Components/login/Login';
import Vedio from './Components/VedioPage/Vedio';
import { Cart, Search, ProductSingle } from '../src/pages/index';
import Category from './pages/SelectedProductCategory/Category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Vedio />} />
        <Route path="/login" element={<Login />} />
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
