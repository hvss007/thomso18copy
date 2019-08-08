import React from "react";
import { Link } from "react-router-dom";

import logoca from '../../ca/login/src/img/logo.png';
import "../../ca/login/src/css/calanding.css";
import '../../ca/login/src/css/Main.css';
import "../verify/verify.css"
// import FetchApi from "../../../utils/FetchAPI";

export default class HomeIndex extends React.Component {
    render() {
        return (
            <div className="ca-opening-middlesection">
                <div>
                    <div className='ca-landing-heading'>
                        <div className="calanding-logo">
                            <Link to="/"><img src={logoca} alt="calanding-logo" /></Link>
                        </div>
                        <div className="vertical_line">
                        </div>
                        <div className="ca-landing-ca common-cursor">
                            <h2>Participate in Thomso</h2>
                        </div>
                    </div>
                </div>
                <div className="main-verify-register-parent">
                    <div className="ca-opening-button-parent" style={{ top: '50%' }}>
                        <div>
                            <Link to="/main/login">
                                <button className="ca-opening-button">Login</button>
                            </Link>
                            <Link to="/main/register" style={{ marginLeft: '3vw' }}>
                                <button className="ca-opening-button">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
