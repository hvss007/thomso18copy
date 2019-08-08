import React from "react";

import "./quizardy.css";
import Instructions from "./Instructions";
import Footer from "./Footer";
import Navbar from "../../beta/home/Navbar";
import { addTopic } from "../../../utils/firebasePush";

import "./Index.css";

let addTopicTimeout

export default class QuizardryIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isNavbar: true
        };
    }

    componentDidMount() {
        addTopicTimeout = setTimeout(() => {
            addTopic("quizardry");
        }, 2000);
    }

    componentWillMount() {
        clearTimeout(addTopicTimeout);
    }

    render() {
        return (
            <div>
                <div className="quizardy-mobile">
                    <Navbar />
                </div>
                <div className="quizardy-parent">
                    <div className="quizardy-navbar">
                        <Navbar background="true" />
                    </div>
                    <div className="quizardy-child">
                        <div className="quizardy-flexcenter">
                            <a href="https://dare2compete.com/o/quizardry-thomso-iit-roorkee-indian-institute-of-technology-iit-roorkee-64347" target="_blank" rel="noopener noreferrer"><button className="quizardy-button quizardy-opening-button">Register</button></a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='quizardy-desktop'>
                        <Navbar />
                    </div>
                    <div className="quizardy-parent-body">
                        <div className="quizardy-parent-innerbody">
                            <Instructions />
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
