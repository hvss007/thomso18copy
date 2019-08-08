import React, { Component } from "react";
import Navbar from "../../beta/home/Navbar.jsx";
import "./src/css/Xpression.css";
import xpression from "./src/img/xpression.jpg";

class Xpression extends Component {
    render() {
        return (
            <div>
                <Navbar background="true" />
                <div className="xpression-campus-image">
                    <div>
                        <img className="xpression-campus-image-child" src={xpression} alt="xpression" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Xpression;
