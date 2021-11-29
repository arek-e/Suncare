import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Home from './home';
import Aboutus from './aboutus';
import Login from './login';
import Products from './products';

const App = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element= {<Home />} />  
                    <Route path = "/aboutus" element = {<Aboutus/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/products" element = {<Products/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};
export default App;