import React, { Component } from "react";
import DelhiOpening from "./DelhiOpening.jsx";
import SectionSecond2 from "../common/SectionSecond2";
import Footer from "../common/Footer";
import ZonalsFormDelhi from "../common/ZonalsFormDelhi";
import Popup from "../../common/popup/Index";
import "../src/css/Index.css";
import painting from "../src/img/Painting1.jpg";
import paintingMobile from "../src/img/paintingPortrait.jpg";

export default class DelhiIndex extends Component {
    constructor()
    {
        super();
        this.state={
            mobile:(window.screen.width < 768)? 0:1,
        };
    }
    render() {
        return (
            <div>
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
                <div style={{ overflow: "hidden" }}>
                    <DelhiOpening />
                </div>
                <div className="delhi-zonals-painting">
                    {this.state.mobile ? <img src={painting} alt="oil=painting-workshop" className="oil-painting-image-delhi"/>: <img src={paintingMobile} alt="oil-painting-workshop" className="oil-painting-image-delhi"/>}
                    <div className="delhi-painting-button-div">
                        <a href="https://www.townscript.com/e/oil-painting-workshop-by-expert-sweety-singh-234221" target="_blank"rel="noopener noreferrer"><button className="delhi-painting-button-child">Register</button></a>
                    </div>
                </div>
                <SectionSecond2 city='delhi' />
                <ZonalsFormDelhi showModal={() => this.popup.show(["Congratulations!", "You have been successfully registered for Karwaan, Thomso18.", "Confirmation email has been sent to your inbox"])} />
                <Footer city='delhi' />
            </div>
        );
    }
}
