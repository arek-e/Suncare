import React from 'react';
// eslint-disable-next-line
import styles from '../css/home.css'
import InfoBox from '../components/infoBox';
import Header from '../components/header';

const Home = () => {
    return (
        <div className="backContainer">
            <Header/>
            <div className="roundRect"/>
            <div className="sixtyContainer">
                <InfoBox/>
            </div>


        </div>
    );
};
export default Home;