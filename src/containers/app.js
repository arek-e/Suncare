import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Home from './home';
import Aboutus from './aboutus';

const App = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element= {<Home />} />  
                    <Route path = "/aboutus" element = {<Aboutus/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};
export default App;