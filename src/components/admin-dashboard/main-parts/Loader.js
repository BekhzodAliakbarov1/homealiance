import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function LoaderComponent() {
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader
                type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
            // timeout={3000} //3 secs
            />
        </div>
    )
}

export default LoaderComponent
