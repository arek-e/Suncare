import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Home from './home';
import Aboutus from './aboutus';
import Login from './login';

const App = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element= {<Home />} />  
                    <Route path = "/aboutus" element = {<Aboutus/>}/>
                    <Route path = "/login" element = {<Login/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};
export default App;