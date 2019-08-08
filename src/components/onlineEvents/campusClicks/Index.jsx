import React, { Component } from "react";
import Navbar from "../../beta/home/Navbar.jsx";
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
                        <a href="https://drive.google.com/file/d/19Tm3-pUE3oEQsYRmhxpz8-tZI7FVAJyf/view" rel="noopener noreferrer" target="_blank">
                            <p className="campus-online-events-rulebook">
                                RuleBook
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CampusClicks;
