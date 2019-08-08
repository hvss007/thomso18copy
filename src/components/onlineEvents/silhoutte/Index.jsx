import React, { Component } from "react";
import Navbar from "../../beta/home/Navbar.jsx";
import "./src/css/Silhoutte.css";
import silhoutte from "./src/img/silhoutte.jpg";

class Silhoutte extends Component {
    render() {
        return (
            <div>
                <Navbar background="true" />
                <div className="silhoutte-image">
                    <div>
                        <img className="silhoutte-image-child" src={silhoutte} alt="silhoutte" />
                        <a href="https://drive.google.com/file/d/1qEMg0XYHL3kYuEdWVBCDRVPAteS7tQeY/view" rel="noopener noreferrer" target="_blank">
                            <p className="silhoutte-online-events-rulebook">
                                RuleBook
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Silhoutte;
