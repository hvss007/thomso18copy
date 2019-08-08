import React, { Component } from "react";
import Navbar from "../beta/home/Navbar.jsx";
import "./src/css/CampusClicks.css";
import campusclicks from "./src/img/campusclicks.png";

class CampusClicks extends Component {
    render() {
        return (
            <div>
                <Navbar background="true"/>
                <div className="campus-image">
                    <div>
                        <img className="campus-image-child" src={campusclicks} alt="campus clicks" />
                    </div>
                </div>
            </div>
        );
    }
}

export default CampusClicks;
