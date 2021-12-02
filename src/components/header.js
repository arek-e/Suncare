import React from 'react'
// eslint-disable-next-line
import styles from '../css/header.css'
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


function Header() {
    return (
        <div className="header">
            <div className="logo inline"> Suncare</div>
            <div className="spacer inline"></div>
            <div className="buttonContainer inline">
                <div className="tmpButton">Home</div>
                <div className="tmpButton">About us</div>
                <div className="tmpButton"><Link to="/products">Products</Link></div>
                <div className="tmpButton">Galley</div>
                <div className="tmpButton">Shop</div>
            </div>
        </div>
    )
}

export default Header
