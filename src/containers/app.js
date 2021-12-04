import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Home from './home';
import AboutUs from './aboutus';
import UserPage from './user';
import Products from './products';
import Signup from './signup';

const App = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element= {<Home />} />  
                    <Route path = "/aboutus" element = {<AboutUs/>}/>
                    <Route path = "/login" element = {<UserPage/>}/>
                    <Route path = "/products" element = {<Products/>}/>
                    <Route path = "/signup" element = {<Signup/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    );
};
export default App;