import React from 'react'
// eslint-disable-next-line
import styles from '../css/header.css'

function Header() {
    return (
        <div className="header">
            <div className="logo inline"> Suncare</div>
            <div className="spacer inline"></div>
            <div className="buttonContainer inline">
                <div className="tmpButton">Home</div>
                <div className="tmpButton">About us</div>
                <div className="tmpButton">Products</div>
                <div className="tmpButton">Galley</div>
                <div className="tmpButton">Shop</div>
            </div>
        </div>
    )
}

export default Header
