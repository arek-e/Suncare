import React from 'react';
// eslint-disable-next-line
import styles from '../css/home.css'
import InfoBox from '../components/InfoBox';
import HeaderMUI from '../components/HeaderMUI';

const Home = () => {
    return (
        <div className="backContainer">
            <HeaderMUI/>
            <div className="roundRect"/>
            <div className="sixtyContainer">
                <InfoBox/>
            </div>


        </div>
    );
};
export default Home;