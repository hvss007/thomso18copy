import React, { Component } from "react";
import ChandigadhOpening from "./ChandigadhOpening.jsx";
import SectionSecond2 from "../common/SectionSecond2";
import Footer from "../common/Footer";
import ZonalsFormChandigadh from "../common/ZonalsFormChandigadh";
import Popup from "../../common/popup/Index";
import "../src/css/Index.css";

export default class ChandigadhIndex extends Component {
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
                    <ChandigadhOpening />
                </div>
                <SectionSecond2 city='chandigadh' />
                <ZonalsFormChandigadh showModal={() => this.popup.show(["Congratulations!", "You have been successfully registered for Karwaan, Thomso18.", "Confirmation email has been sent to your inbox"])} />
                <Footer city='chandigadh' />
            </div>
        );
    }
}
