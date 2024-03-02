import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import Home from './Components/Homepage/Home';
import './App.css'
import Login from './Components/login/Login';
import Vedio from './Components/VedioPage/Vedio';
import {CategoryProduct,Cart,Search,ProductSingle} from '../src/pages/index'
import React, { lazy, Suspense } from 'react';





function App() {
  return (
   <>
   
   <Router>
    <Routes>
    <Route exact path='/' element={<Vedio/>}/>
    <Route  path='/login' element={<Login/>}/>
      <Route  path='/Home' element={<Home/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/Search' element={<Search/>}/>
    </Routes>
   </Router>
   
   </>
  )
}

export default App
