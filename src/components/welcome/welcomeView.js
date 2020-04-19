import React from 'react';
import './welcome.css'
import {Link} from "react-router-dom";

const WelcomeView = () => {
    return (
        <div className="wc-wrapper">
            <div className="wc-contents">
                <div>
                    <h1 className="wc-header">Chowk</h1>
                    <span className="wc-tagline">Where questions come to die!</span>
                </div>
                <div className="wc-links-wrapper">
                    <Link to={"/login"}>
                        <button className="btn btn-primary wc-link">Login</button>
                    </Link>
                    <Link to={"/register"}>
                        <button className="btn btn-primary wc-link">Register</button>
                    </Link>
                </div>
                <div className="wc-privacy-links-wrapper">
                    <Link
                        target="_blank"
                        to={"/privacy-policy"}
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WelcomeView;
