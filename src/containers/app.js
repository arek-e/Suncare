import React from 'react';
// Import react router dom component
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import {useState, useMemo} from 'react'
import Home from './home';
import AboutUs from './aboutus';
import UserPage from './user';
import Products from './products';
import Signup from './signup';
import { UserContext } from '../components/UserContext';
import ProductCardPage from '../components/ProductCardPage';



const App = () => {
    const [account, setAccount] = useState(null);
    const value = useMemo(() => ({account, setAccount}), [account, setAccount]);

    return(
        <div>
            <UserContext.Provider value={value}>
                {/* Define all the routes for the website */}
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element= {<Home />} />  
                        <Route path = "/aboutus" element = {<AboutUs/>}/>
                        <Route path = "/user" element = {<UserPage/>}/>
                        <Route path = "/products" element = {<Products/>}/>
                        <Route path = "/signup" element = {<Signup/>}/>
                        {/* Dynamic route based on the id of a product */}
                        <Route path="/products/item/:id" element={<ProductCardPage/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider >
        </div>
    );
};
export default App;