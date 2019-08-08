import React, { Component } from "react";
import JaipurOpening from "./JaipurOpening";
import SectionSecond2 from "../common/SectionSecond2";
import Footer from "../common/Footer";
import ZonalsFormJaipur from "../common/ZonalsFormJaipur";
import Popup from "../../common/popup/Index";

export default class JaipurIndex extends Component {
    render() {
        return (
            <div>
                <Popup {...this.props} onRef={ref => (this.popup = ref)} />
                <div style={{ overflow: "hidden" }}>
                    <JaipurOpening />
                </div>
                <SectionSecond2 city='jaipur' />
                <ZonalsFormJaipur showModal={() => this.popup.show(["Congratulations!", "You have been successfully registered for Karwaan, Thomso18.", "Confirmation email has been sent to your inbox"])} />
                <Footer city='jaipur' />
            </div>
        );
    }
}
