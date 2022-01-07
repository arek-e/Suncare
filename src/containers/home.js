import React from 'react';
// eslint-disable-next-line
import styles from '../css/home.css'
import HeaderMUI from '../components/HeaderMUI';
import stylesInfo from '../css/infoBox.css'
import { Link } from "react-router-dom";
import { Button } from '@mui/material'

const Home = () => {
    return (
        <div className="backContainer">
            <HeaderMUI/>
            <div className="roundRect"/>
            <div className="sixtyContainer">
            <div className="infoContainer">
            <div className="infoBox">
                <div className="infoSmallTitle">
                    Skincare
                </div>
                <div className="infoBigTitle">
                    Cheerful Serum
                </div>
                <div className="infoText">
                    This face serum with cheerful packaging has good properties for your face.
                    This way your face will glow and you will be happy.
                    Take care of your face
                </div>
                <Button variant="contained"><Link to="/signup">Register new account</Link></Button>
            </div>
            </div>
            </div>


        </div>
    );
};
export default Home;