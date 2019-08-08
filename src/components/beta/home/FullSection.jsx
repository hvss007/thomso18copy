import React, { Component } from "react";
import { SectionsContainer, Section } from "react-fullpage";
import logo from "./src/img/logomain.svg";
import arrow from "./src/img/arrow.svg";
import bell from "./src/img/bell.png";
import "./src/css/Main.css";
import About from "./About";
import Footfall from "./Footfall";
import Celebrity from "./Celebrity";
import Contact from "./Contact";
import { Link } from "react-router-dom";
export default class FullSection extends Component {
    render() {
        let options = {
            sectionClassName: "section",
            anchors: ["home", "aboutUs", "footfall", "celebrity", "contactUs"],
            scrollBar: false,
            navigation: false,
            verticalAlign: false,
            sectionPaddingTop: "0px",
            slidesNavPosition: "bottom",
            arrowNavigation: true
        }
        return(
            <div>
                <div className="sticky-container">
                <img src={bell} width="32" height="32" alt="Notifications" />
                    <ul className="sticky">
                        <li>
                            <p>WHAT'S NEW <br /><br /></p>
                            <div id="submenu">
                                <Link to="/cupid" >Cupid</Link>
                                <br /><Link to="/whythomso">Why Thomso</Link>
                                <br /><Link to="/main">Register</Link><br />
                                <br /><Link to="/toppr">Toppr</Link><br />
                            </div>
                        </li>

                    </ul>
                </div>
                <SectionsContainer {...options}>

                    <Section>
                        <div className="body">
                            <div className="imagelogo" align="center">
                                <img src={logo} alt="logo" className="mainlogo" height="200px" />
                                <div className="arrowmove">
                                    <a href="#aboutUs" address="true">
                                        <img src={arrow} className="betahomedownarrow bounce" alt="a" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Section>


                    <Section>
                        <Footfall />
                    </Section>

                    <Section>
                        <Celebrity />
                    </Section>

                    <Section>
                        <About />
                    </Section>

                    <Section>
                        <Contact />
                    </Section>

                </SectionsContainer>
            </div>
        )
    }
}
