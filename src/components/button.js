import React from 'react'
// eslint-disable-next-line
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


function ButtonProducts() {
    return (
         <>
            <div>
                <button><Link to="/login">Go to Login</Link></button>
            </div>
        </>
    )
}

export default ButtonProducts
