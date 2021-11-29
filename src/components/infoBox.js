import React from 'react'
// eslint-disable-next-line
import styles from '../css/infoBox.css'
import ButtonProducts from './button'

function InfoBox() {
    return (
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
                <ButtonProducts/>
                {/* <div className="merInfo"></div> */}
            </div>

        </div>
    )
}

export default InfoBox
