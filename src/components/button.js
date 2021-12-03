import React from 'react'
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


function ButtonProducts() {
    return (
         <>
            <div>
                <button><Link to="/user">Register new account</Link></button>
            </div>
        </>
    )
}

export default ButtonProducts
