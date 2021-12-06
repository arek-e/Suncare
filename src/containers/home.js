import React from 'react';
// eslint-disable-next-line
import styles from '../css/home.css'
import InfoBox from '../components/InfoBox';
import Header from '../components/Header';

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