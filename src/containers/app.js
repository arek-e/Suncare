import React from 'react';
// Import react router dom component
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {useState, useMemo} from 'react'
import Home from './home';
import AboutUs from './aboutus';
import UserPage from './user';
import Products from './products';
import Signup from './signup';
import { UserContext } from '../components/UserContext';
import ProductCardPage from '../components/Products/ProductCardPage';
import Checkout from '../components/Checkout/Checkout';
import Order from '../components/User/Admin-Dashboard/Orders';
import Customer from '../components/User/Admin-Dashboard/Customer';
import Account from '../components/User/Admin-Dashboard/Account';
import OrderPage from '../components/User/Admin-Dashboard/OrderPage';
import CustomerPage from '../components/User/Admin-Dashboard/CustomerPage';
import Inventory from '../components/User/Admin-Dashboard/Inventory';
import InventoryPage from '../components/User/Admin-Dashboard/InventoryPage';



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
                        <Route path = "/user" element = {<UserPage/>}>
                            <Route path="account/" element={<Account/>}/>
                            <Route path="orders/" element={<Order/>}/>
                            <Route path="orders/order/:id" element={<OrderPage/>}/>
                            <Route path="customers/" element={<Customer/>}/>
                            <Route path="customers/customer/:id" element={ <CustomerPage/> }/>
                            <Route path="inventory/" element={<Inventory/>}/>
                            <Route path="inventory/product/:id" element={ <InventoryPage/> }/>
                        </Route>
                        <Route path = "/products" element = {<Products/>}/>
                        <Route path = "/checkout" element = {<Checkout/>}/>
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